import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import Admin from "./pages/Admin";
import MyRequests from "./pages/MyRequests";

function ProtectedRoute({ role, children }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin" : "/rooms"}
        replace
      />
    );
  }

  return children;
}

export default function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate
                to={user.role === "admin" ? "/admin" : "/rooms"}
                replace
              />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/rooms"
          element={
            <ProtectedRoute role="user">
              <Rooms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-requests"
          element={
            <ProtectedRoute role="user">
              <MyRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

      <footer className="footer">
        © 2026 RentEase · Find a place that feels like home.
      </footer>
    </>
  );
}