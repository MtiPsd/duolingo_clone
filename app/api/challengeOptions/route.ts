import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  if (!isAdmin()) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const data = await db.query.challengeOptions.findMany();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  if (!isAdmin()) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const body = await req.json();
  const data = await db
    .insert(challengeOptions)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
}
