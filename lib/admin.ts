import { auth } from "@clerk/nextjs";

const allowedIds = ["user_2dvCqwmGEcow3WKoXoWfjYq5HLP"];

export function isAdmin() {
  const { userId } = auth();

  if (!userId) return false;

  return allowedIds.includes(userId);
}
