import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateUniversityDashboard = () => {
  const schoolToken = useSelector((state) => state.schoolToken);

  return schoolToken ? <Outlet /> : <Navigate to="/universitylogin" />;
};

export default PrivateUniversityDashboard;