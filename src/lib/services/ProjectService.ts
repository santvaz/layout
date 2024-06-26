export const getProjectById = async (projectId: string) => {
  const response = await fetch(`www.swifly.app/api/projects/${projectId}`);
  const data = await response.json();
  return data;
};

export const updateProjectById = async (
  projectId: string,
  title: string,
  description: string
) => {
  const response = await fetch(`www.swifly.app/api/projects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });
  const data = await response.json();
  return data;
};
