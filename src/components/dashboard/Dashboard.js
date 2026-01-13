import { useAuth } from "../../context/AuthContext";
import ManagerDashboard from "./ManagerDashboard";
import MemberDashboard from "./MemberDashboard";
import AdminDashboard from "../admin/AdminDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === "admin") return <AdminDashboard />;
  if (user.role === "manager") return <ManagerDashboard />;
  return <MemberDashboard />;
};

export default Dashboard;
