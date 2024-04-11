import { cache } from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { userProgress } from "@/db/schema";

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
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
