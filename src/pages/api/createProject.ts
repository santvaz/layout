import type { APIContext } from "astro";
import { generateId } from "lucia";
import { Users, Projects, Permissions, db, eq } from "astro:db";

export const prerender = false;

export async function POST(context: APIContext): Promise<Response> {
  const { request, locals } = context;

  const session = locals.session;

  if (!session) {
    console.error("No user session found");
    return new Response("No user session found", { status: 401 });
  }

  const formData = await request.formData();
  const title = formData.get("project-title")?.toString();
  const description = formData.get("project-description")?.toString();

  if (!title || !description) {
    // console.error("Title and description are required");
    return new Response("Title and description are required", { status: 400 });
  }

  const sessionUserId = session.userId;
  // console.log("Session User ID:", sessionUserId);

  const foundUser = (
    await db.select().from(Users).where(eq(Users.id, sessionUserId))
  ).at(0);

  if (!foundUser) {
    console.error("User not found with ID:", sessionUserId);
    return new Response("User not found", { status: 404 });
  }

  const sessionUsername = foundUser.username;
  // console.log("Found User:", foundUser);
  // console.log("Session Username:", sessionUsername);

  const projectId = generateId(15);
  const permissionId = generateId(15);
  // console.log("Generated Project ID:", projectId);

  try {
    // console.log("Inserting project with values:", {
    //   id: projectId,
    //   user_creator: sessionUserId, // user_creator should be the ID, not username
    //   title: title,
    //   description: null, // assuming description is optional
    // });

    await db.insert(Projects).values([
      {
        id: projectId,
        user_creator: sessionUserId, // user_creator should be the ID, not username
        title: title,
        description: description,
      },
    ]);

    await db.insert(Permissions).values([
      {
        id: permissionId,
        type: "owner",
        user_id: sessionUserId,
        project_id: projectId,
      },
    ]);
  } catch (error) {
    console.error("Error inserting project:", error);
    return new Response("Error creating project", { status: 500 });
  }

  const redirectUrl = `/projects/${projectId}`;
  // console.log("Redirecting to URL:", redirectUrl);

  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl,
    },
  });
}
