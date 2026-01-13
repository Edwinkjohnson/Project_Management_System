import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./utils/ChartConfig";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import { NotificationProvider } from "./context/NotificationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <AuthProvider>
        <ProjectProvider>
          <TaskProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </TaskProvider>
        </ProjectProvider>
      </AuthProvider>
    </UserProvider>
  </React.StrictMode>
);
