import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import WorkshopsPage from "./pages/WorkshopsPage";
import WorkshopDetailPage from "./pages/WorkshopDetailPage";
import ConfirmationPage from "./pages/ConfirmationPage";

const HIDE_NAVBAR = ["register", "login"];

const Router = () => {
  const { currentPage } = useApp();
  const showNav = !HIDE_NAVBAR.includes(currentPage);

  const pages = {
    home: <HomePage />,
    register: <RegisterPage />,
    login: <LoginPage />,
    dashboard: <DashboardPage />,
    profile: <ProfilePage />,
    workshops: <WorkshopsPage />,
    workshopDetail: <WorkshopDetailPage />,
    confirmation: <ConfirmationPage />,
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {showNav && <Navbar />}
      <main style={{ flex: 1 }}>{pages[currentPage] || <HomePage />}</main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
