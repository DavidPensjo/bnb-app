"use client";

import React, { useState } from "react";
import { loginUser } from "@/app/auth/actions";

interface LoginFormProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  closeDialog: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  setIsAuthenticated,
  closeDialog,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser({ email, password });
      setIsAuthenticated(true); // Update state to show logged-in status
      closeDialog(); // Close the dialog or drawer
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input-field"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input-field"
      />
      <button type="button" onClick={handleLogin} className="button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
