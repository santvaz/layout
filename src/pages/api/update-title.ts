import type { APIContext } from "astro";
import { db, Projects, Permissions, eq, count, and } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const { request } = context;
  const formData = await request.formData();
  const currentUrl = formData.get("current-url")?.toString();
  const projectId = formData.get("project-id-title")?.toString();
  const updatedTitle = formData.get("project-edit-title");

  console.log("Form Data:", [...formData]);

  if (!projectId) {
    return new Response("Project ID is required", { status: 400 });
  }

  if (!updatedTitle) {
    return new Response("Title is required", { status: 400 });
  }

  const title = updatedTitle.toString();

  // if User doesn't have 'owner' from Permissions table, return with 403 status
  const hasOwnerPermission = await db
    .select()
    .from(Permissions)
    .where(
      and(eq(Permissions.project_id, projectId), eq(Permissions.type, "owner"))
    );

  if (!hasOwnerPermission) {
    return new Response("You don't have permission to update the title", {
      status: 403,
    });
  }

  await db
    .update(Projects)
    .set({ title: title })
    .where(eq(Projects.id, projectId.toString()));

  // return new Response("Title updated successfully", { status: 200 });
  return context.redirect(currentUrl, 302);
}
