import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  // handle change
  const handleChange = (event) => {
    // const { name, value } = event.target.value;
    setUser(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("user", user);
    navigate("/wallet");
  };

  return (
    <div className="login">
      <h1>Enter Name</h1>

      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={user}
          placeholder="name"
          onChange={handleChange}
        />
        <button>Start</button>
      </form>
    </div>
  );
};
