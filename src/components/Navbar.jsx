import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <header className="navbar">
      <Link
        className="brand"
        to={
          user
            ? user.role === "admin"
              ? "/admin"
              : "/rooms"
            : "/"
        }
      >
        RentEase<span>.</span>
      </Link>

      {user && (
        <nav>
          {user.role === "admin" ? (
            <Link to="/admin">
              Admin Dashboard
            </Link>
          ) : (
            <>
              <Link to="/rooms">
                Find Rooms
              </Link>

              <Link to="/my-requests">
                My Requests
              </Link>
            </>
          )}

          <span className="user-tag">
            {user.name} · {user.role}
          </span>

          <button
            className="btn btn-small btn-outline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}