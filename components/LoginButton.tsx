"use client";
import React from "react";
import { CircleUserRound, Menu } from "lucide-react";
import { useState } from "react";

const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent text-black border rounded-full flex p-2 px-3 gap-4 items-center"
      >
        <Menu size={20} />
        <CircleUserRound className="opacity-60" size={32} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-12 bg-white border rounded-lg shadow-lg p-4">
          <a href="/api/auth/logout">Logout</a>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
