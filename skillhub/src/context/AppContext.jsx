import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [bookedWorkshops, setBookedWorkshops] = useState([]);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [profileTab, setProfileTab] = useState("profile");

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const login = (userData) => {
    setUser(userData);
    navigate("dashboard");
  };

  const logout = () => {
    setUser(null);
    navigate("home");
  };

  const bookWorkshop = (workshop) => {
    if (!bookedWorkshops.find((w) => w.id === workshop.id)) {
      const booked = {
        ...workshop,
        bookedAt: new Date().toISOString(),
        status: "confirmed",
      };
      setBookedWorkshops((prev) => [...prev, booked]);
      setConfirmedBooking(booked);
    }
    navigate("confirmation");
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigate,
        user,
        login,
        logout,
        selectedWorkshop,
        setSelectedWorkshop,
        bookedWorkshops,
        bookWorkshop,
        confirmedBooking,
        setConfirmedBooking,
        profileTab,
        setProfileTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
