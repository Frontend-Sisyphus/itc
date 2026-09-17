import { NextResponse } from "next/server";
import { fetchTechnologies } from "@/lib/taskmanager/server";

export async function GET() {
  try {
    const catalog = await fetchTechnologies();
    return NextResponse.json(catalog);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Technologies fetch failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
