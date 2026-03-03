import api from "./axios";

export const fetchTasks = (projectId) => api.get(`/tasks/project/${projectId}`);
export const fetchAllTasks = () => api.get("/tasks");
export const createTask = (taskData) => api.post("/tasks", taskData);
export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
