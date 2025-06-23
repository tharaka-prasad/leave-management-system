import React, { Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import LoginPage from "./views/LoginPage/login";
import Home from "./views/UserHome/Home";
import Dashboard from "./views/AdminDashboard/AdminDashboard";
import PageLoader from "./componenets/PageLoader";
import MainLayout from "./componenets/HeaderFooter"; // Assuming Layout is renamed or imported as MainLayout

import { validateUser, type User } from "./api/userApi";
import useCurrentUser from "./utils/useCurrentUser";
import RegisterPage from "./views/RegisterPage/register";

// Protected Route for authenticated users
const ProtectedRoute = () => {
  const { user, status } = useCurrentUser();

  if (status === "loading" || status === "idle" || status === "pending") {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

// Only for Admin
const UserProtectedRoute = () => {
  const { user, status } = useCurrentUser();

  if (status === "loading" || status === "idle" || status === "pending") {
    return <PageLoader />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

function withLayout(
  Component: React.ComponentType,
  Layout: React.ComponentType<{ children: React.ReactNode }>
) {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    </Layout>
  );
}

function withoutLayout(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

const AppRoutes: React.FC = () => {
  // Prefetch the user just once here if needed globally
  useQuery<User>({
    queryKey: ["current-user"],
    queryFn: validateUser,
  });

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={withoutLayout(LoginPage)} />
      <Route path="/register" element={withoutLayout(RegisterPage)} />

      {/* Admin Protected Routes */}
      <Route element={<UserProtectedRoute />}>
        <Route path="/dashboard" element={withLayout(Dashboard, MainLayout)} />
      </Route>

      {/* Authenticated User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={withLayout(Home, MainLayout)} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
