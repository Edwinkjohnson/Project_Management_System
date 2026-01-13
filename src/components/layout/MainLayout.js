import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4 bg-light min-vh-100">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
