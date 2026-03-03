import api from "./axios";

export const fetchProjects = () => api.get("/projects");
export const createProject = (projectData) => api.post("/projects", projectData);
export const updateProject = (id, projectData) => api.put(`/projects/${id}`, projectData);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
