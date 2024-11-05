"use client";

import React, { useState } from "react";
import { registerUser } from "@/app/auth/actions";

interface RegisterFormProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  closeDialog: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  setIsAuthenticated,
  closeDialog,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser({ email, password, name });
      setIsAuthenticated(true);
      closeDialog();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="input-field"
      />
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
      <button type="button" onClick={handleRegister} className="button">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
