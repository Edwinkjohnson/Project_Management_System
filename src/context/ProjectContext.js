import { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as projectApi from "../api/projectApi";
import { useAuth } from "./AuthContext";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const loadProjects = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await projectApi.fetchProjects();
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const addProject = async (projectData) => {
    try {
      const res = await projectApi.createProject(projectData);
      setProjects((prev) => [...prev, res.data]);
      return res.data;
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const updateProject = async (id, updatedData) => {
    try {
      const res = await projectApi.updateProject(id, updatedData);
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await projectApi.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{ projects, loading, addProject, updateProject, deleteProject, refreshProjects: loadProjects }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
