import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

export default function Login() {
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login({ name: name.trim() || (role === "admin" ? "Admin" : "Guest User"), email, role }));
    navigate(role === "admin" ? "/admin" : "/rooms");
  }

  return (
    <main className="login-page">
      <section className="login-copy">
        <span className="eyebrow">FIND A PLACE TO CALL HOME</span>
        <h1>Your next home<br />is closer than you think.</h1>
        <p>Discover comfortable rooms and apartments that fit your lifestyle and budget.</p>
        <div className="mini-stats">
        <div>
          <b>Easy</b>
          <span>Room search</span>
        </div>
        <div>
          <b>Simple</b>
          <span>Request tracking</span>
        </div>
        </div>
      </section>
      <section className="login-card">
        <div className="brand large">
          RentEase
          <span>.</span>
        </div>
        <h2>Welcome back</h2>
        <p className="muted">
          Choose your account type to continue.
        </p>
        <div className="role-switch">
          <button className={
            role === "user" 
            ? 
            "selected" : ""
          }
          onClick={
            () => setRole("user")
          } 
          type="button">
            User Login
          </button>
          <button className={
            role === "admin"
             ? "selected" : ""
            } 
          onClick={
            () => setRole("admin")
          } 
          type="button">
            Admin Login
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Your name</label>
          <input 
            value={name} 
            onChange={
              (e) => setName(e.target.value)
            } 
            placeholder="Enter your name" 
          />
          <label>Email address</label>
          <input 
            type="email" 
            required value={email} 
            onChange={
              (e) => setEmail(e.target.value)
            } 
            placeholder="you@example.com" 
          />
          <button 
            className="btn full" 
            type="submit"
          >
            Continue as {
              role === "admin" 
              ? 
              "Admin" : "User"
            } 
              →
            </button>
        </form>
      </section>
    </main>
  );
}