"use server";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import {
  challengeProgress,
  challenges,
  userProgress,
} from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function upsertChallengeProgress(challengeId: number) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthorized");
  }

  const currentUserProgress = await getUserProgress();
  // TODO: Handle subscription query later

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  const currentChallenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!currentChallenge) {
    throw new Error("challenge not found");
  }
  const lessonId = currentChallenge?.lessonId;

  const currentChallengeProgress =
    await db.query.challengeProgress.findFirst({
      where: and(
        eq(challengeProgress.userId, userId),
        eq(challengeProgress.challengeId, challengeId),
      ),
    });

  // is this practice or first time ?
  // TODO: Boolean vs !! ?
  const isPractice = !!currentChallengeProgress;

  // TODO: Not if user has a subscription
  if (currentUserProgress.hearts === 0 && !isPractice) {
    return { error: "hearts" };
  }

  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, currentChallengeProgress.id));

    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }

  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  });

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 10,
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
}
