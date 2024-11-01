"use client";

import React, { useState, useEffect } from "react";
import { CircleUserRound, Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { logoutUser } from "@/app/auth/actions";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
    router.refresh();
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/status");
        if (res.ok) {
          const { authenticated } = await res.json();
          setIsAuthenticated(authenticated);
        }
      } catch (error) {
        console.error("Error fetching auth status:", error);
      }
    };
    checkAuth();
  }, []);

  const openAuthForm = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsDialogOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="bg-transparent text-black border rounded-full flex p-2 px-3 gap-4 items-center"
      >
        <Menu size={20} />
        <CircleUserRound className="opacity-60" size={32} />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-12 bg-white border rounded-lg shadow-lg p-4 z-20">
          {isAuthenticated ? (
            <>
              <a href="/listings" className="block py-1">
                Listings
              </a>
              <a href="/bookings" className="block py-1">
                Bookings
              </a>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button
                onClick={() => openAuthForm("login")}
                className="block py-1 text-left w-full"
              >
                Login
              </button>
              <button
                onClick={() => openAuthForm("register")}
                className="block py-1 text-left w-full"
              >
                Register
              </button>
            </>
          )}
        </div>
      )}

      {isDesktop ? (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {authMode === "login" ? "Login" : "Register"}
              </DialogTitle>
            </DialogHeader>
            {authMode === "login" ? (
              <LoginForm
                setIsAuthenticated={setIsAuthenticated}
                closeDialog={() => setIsDialogOpen(false)}
              />
            ) : (
              <RegisterForm
                setIsAuthenticated={setIsAuthenticated}
                closeDialog={() => setIsDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {authMode === "login" ? "Login" : "Register"}
              </DrawerTitle>
            </DrawerHeader>
            {authMode === "login" ? (
              <LoginForm
                setIsAuthenticated={setIsAuthenticated}
                closeDialog={() => setIsDialogOpen(false)}
              />
            ) : (
              <RegisterForm
                setIsAuthenticated={setIsAuthenticated}
                closeDialog={() => setIsDialogOpen(false)}
              />
            )}
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default LoginButton;
