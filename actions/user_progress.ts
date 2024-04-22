"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import {
  challengeProgress,
  challenges,
  userProgress,
} from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function upsertUserProgress(courseId: number) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("unauthorized");
  }
  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  // TODO: Enable once units and lessons are added
  // if (!course.units.length || !course.units.lessons.length) {
  //   throw new Error("Course is empty");
  // }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "./mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "./mascot.svg",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
}

export async function reduceHearts(challengeId: number) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthorized");
  }

  const currentUserProgress = await getUserProgress();
  // TODO: Get user subscription

  const currentChallenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!currentChallenge) {
    throw new Error("Challenge not found");
  }

  const lessonId = currentChallenge.lessonId;

  const currentChallengeProgress =
    await db.query.challengeProgress.findFirst({
      where: and(
        eq(challengeProgress.userId, userId),
        eq(challengeProgress.challengeId, challengeId),
      ),
    });

  const isPractice = !!currentChallengeProgress;

  if (isPractice) {
    return { error: "practice" };
  }

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  // TODO: Handle subscription

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
}
