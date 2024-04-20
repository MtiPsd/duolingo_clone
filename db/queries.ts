import { cache } from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import {
  challengeProgress,
  courses,
  units,
  userProgress,
} from "@/db/schema";

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  // TODO: whether order is needed
  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    //  populate
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  // simplifying data so we don't need heavy calculation on the front end
  const simplifiedData = data.map(unit => {
    const lessonsWithCompletedStatus = unit.lessons.map(lesson => {
      const allChallengesCompleted = lesson.challenges.every(
        challenge => {
          return (
            challenge.challengeProgress &&
            challenge.challengeProgress.length > 0 &&
            challenge.challengeProgress.every(
              progress => progress.completed,
            )
          );
        },
      );
      return { ...lesson, completed: allChallengesCompleted };
    });
    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return simplifiedData;
});

export const getUserProgress = cache(async () => {
  const { userId } = auth();

  if (!userId) return null;

  const data = db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    // populate active course relation
    with: {
      activeCourse: true,
    },
  });
  return data;
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    // TODO: populate units and lessons
  });

  return data;
});
