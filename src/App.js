import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';

import MainLayout from "./components/layout/MainLayout";
import AdminDashboard from "./components/admin/AdminDashboard";

import ProjectForm from "./components/projects/ProjectForm";
import ProjectList from "./components/projects/ProjectList";
import TaskBoard from "./components/tasks/TaskBoard";
import CalendarView from "./components/calendar/CalendarView";
import Analytics from "./components/analytics/Analytics";
import Team from "./components/team/Team";
import Chat from "./components/chat/Chat";
import UserManagement from "./components/admin/UserManagement";
import ProjectWorkspace from "./components/projects/ProjectWorkspace";
import ManageProjects from "./components/projects/ManageProjects";
import EditProject from "./components/projects/EditProject";
import Dashboard from "./components/dashboard/Dashboard";





function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>


        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<MainLayout><UserManagement /></MainLayout>} />
        <Route path="/projects" element={<ManageProjects />} />
        <Route path="/projects/edit/:id" element={<EditProject />} />
        



        <Route path="/dashboard" element={
  <MainLayout>
    <Dashboard />
  </MainLayout>
} />

<Route path="/projects" element={
  <MainLayout>
    <ManageProjects />
  </MainLayout>
} />

<Route path="/projects/edit/:id" element={
  <MainLayout>
    <EditProject />
  </MainLayout>
} />


        <Route path="/projects" element={
          <MainLayout>
            <ProjectList />
          </MainLayout>
        } />

        <Route path="/projects/new" element={
          <MainLayout>
            <ProjectForm />
          </MainLayout>
        } />

        <Route path="/tasks" element={
          <MainLayout>
            <TaskBoard />
          </MainLayout>
        } />

        <Route path="/calendar" element={
          <MainLayout>
            <CalendarView />
          </MainLayout>
        } />

        <Route path="/analytics" element={
          <MainLayout>
            <Analytics />
          </MainLayout>
        } />

        <Route path="/team" element={
          <MainLayout>
            <Team />
          </MainLayout>
        } />

        <Route
  path="/chat"
  element={
    <MainLayout>
      <Chat />
    </MainLayout>
  }
/>
<Route path="/projects/:id" element={
  <MainLayout>
    <ProjectWorkspace />
  </MainLayout>
} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
