import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom"; // ✅ use react-router-dom
import useCurrentUser from "./utils/useCurrentUser";
import Login from "./views/LoginPage/login";         // ✅ Make sure these are valid component imports
// import Register from "";   // ✅ Correct import

// Protected route wrapper
const ProtectedRoute = () => {
  const { user, status } = useCurrentUser();

  if (status === "loading" || status === "idle" || status === "pending") {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}

      {/* Protected routes wrapper */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        {/* Add more protected routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
