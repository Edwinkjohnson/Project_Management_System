import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    return JSON.parse(localStorage.getItem("projects")) || [];
  });

  const sync = (data) => {
    setProjects(data);
    localStorage.setItem("projects", JSON.stringify(data));
  };

  const addProject = (project) => {
    sync([...projects, project]);
  };

  const updateProject = (id, updatedData) => {
    const updated = projects.map(p =>
      p.id === id ? { ...p, ...updatedData } : p
    );
    sync(updated);
  };

  const deleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id);
    sync(updated);
  };

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
