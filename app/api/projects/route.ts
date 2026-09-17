import { NextResponse } from "next/server";
import { fetchProjects } from "@/lib/taskmanager/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");
  const username = searchParams.get("username")?.trim();
  const id = idParam ? Number(idParam) : undefined;

  if (idParam && Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const projects = await fetchProjects({
      id,
      username: username || undefined,
    });
    return NextResponse.json(projects);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Projects fetch failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
