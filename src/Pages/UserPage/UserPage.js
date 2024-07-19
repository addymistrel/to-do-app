import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "../../components/Dashboard/Dashboard";
import { Navigate } from "react-router-dom";

export default function UserPage() {
  const loginState = useSelector((state) => state.user.isAuthenticated);
  if (!loginState) {
    return <Navigate to={"/"} />;
  }
  return <Dashboard />;
}
