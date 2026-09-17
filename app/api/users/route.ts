import { NextResponse } from "next/server";
import { fetchUsers } from "@/lib/taskmanager/server";

export async function GET() {
  try {
    const users = await fetchUsers();
    return NextResponse.json(users);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Users fetch failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
