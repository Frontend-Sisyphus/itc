import { NextResponse } from "next/server";
import { searchUsers } from "@/lib/taskmanager/server";

export async function GET(request: Request) {
  const term = new URL(request.url).searchParams.get("term")?.trim() ?? "";

  if (term.length < 2) {
    return NextResponse.json(
      { error: "term must be at least 2 characters" },
      { status: 400 },
    );
  }

  try {
    const users = await searchUsers(term);
    return NextResponse.json(users);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Search failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
