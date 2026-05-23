import { useState, useEffect } from "react";

export const useSession = () => {
  const [session, setSession] = useState(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        return { user: JSON.parse(userStr) };
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage:", e);
    }
    return null;
  });

  useEffect(() => {
    const checkSession = () => {
      try {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const parsed = JSON.parse(userStr);
          if (JSON.stringify(parsed) !== JSON.stringify(session?.user)) {
            setSession({ user: parsed });
          }
        } else if (session) {
          setSession(null);
        }
      } catch (e) {
        setSession(null);
      }
    };

    checkSession();
    window.addEventListener("storage", checkSession);
    window.addEventListener("auth-change", checkSession);
    const interval = setInterval(checkSession, 1000);

    return () => {
      window.removeEventListener("storage", checkSession);
      window.removeEventListener("auth-change", checkSession);
      clearInterval(interval);
    };
  }, [session]);

  return {
    data: session,
    status: session ? "authenticated" : "unauthenticated"
  };
};

export const signInWithGoogle = (role = "USER") => {
  const mockUser = {
    name: role === "ADMIN" ? "Admin User" : "Laara Explorer",
    email: role === "ADMIN" ? "admin@laarainnovations.com" : "explorer@gmail.com",
    image: role === "ADMIN" 
      ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150"
      : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150",
    role: role,
    provider: "google"
  };
  localStorage.setItem("user", JSON.stringify(mockUser));
  localStorage.setItem("token", "mock-google-token");
  window.dispatchEvent(new Event("auth-change"));
};

export const signOut = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("auth-change"));
};
