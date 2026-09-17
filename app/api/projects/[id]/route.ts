import { NextResponse } from "next/server";
import { fetchProjectById, fetchProjects } from "@/lib/taskmanager/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id: raw } = await params;
  const id = Number(raw);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    try {
      const project = await fetchProjectById(id);
      return NextResponse.json(project);
    } catch {
      const list = await fetchProjects({ id });
      const project = Array.isArray(list) ? list[0] : list;
      if (!project) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json(project);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Project fetch failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
