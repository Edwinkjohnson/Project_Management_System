import { createContext, useContext, useState, useCallback, useMemo } from "react";
import * as taskApi from "../api/taskApi";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({}); // Store as { projectId: [tasks] }
  const [loading, setLoading] = useState(false);

  // Flattened array for global views (dashboards)
  const allTasks = useMemo(() => Object.values(tasks).flat(), [tasks]);

  const loadTasks = useCallback(async (projectId) => {
    setLoading(true);
    try {
      const res = await taskApi.fetchTasks(projectId);
      setTasks((prev) => ({ ...prev, [projectId]: res.data }));
    } catch (error) {
      console.error(`Error fetching tasks for project ${projectId}:`, error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAllTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await taskApi.fetchAllTasks();
      const grouped = res.data.reduce((acc, task) => {
        const pid = task.projectId?._id || task.projectId;
        if (pid) {
          if (!acc[pid]) acc[pid] = [];
          acc[pid].push(task);
        }
        return acc;
      }, {});
      setTasks(grouped);
    } catch (error) {
      console.error("Error fetching all tasks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (taskData) => {
    try {
      const res = await taskApi.createTask(taskData);
      const pid = res.data.projectId?._id || res.data.projectId;
      setTasks((prev) => ({
        ...prev,
        [pid]: [...(prev[pid] || []), res.data],
      }));
      return res.data;
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, updatedFields) => {
    try {
      const res = await taskApi.updateTask(id, updatedFields);
      const pid = res.data.projectId?._id || res.data.projectId;
      setTasks((prev) => {
        if (!prev[pid]) return prev;
        return {
          ...prev,
          [pid]: prev[pid].map((t) => (t._id === id ? res.data : t)),
        };
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id, projectId) => {
    try {
      await taskApi.deleteTask(id);
      const pid = projectId?._id || projectId;
      setTasks((prev) => {
        if (!prev[pid]) return prev;
        return {
          ...prev,
          [pid]: prev[pid].filter((t) => t._id !== id),
        };
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, allTasks, loading, loadTasks, loadAllTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
