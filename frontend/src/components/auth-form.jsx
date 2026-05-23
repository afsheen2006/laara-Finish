import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function AuthForm() {
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || undefined;

  const handleGoogleCredentialResponse = async (response) => {
    try {
      setLoading(true);
      const token = response.credential;
      
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
      // Save Google authenticated user data in database with secure token verification
      const responseBackend = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: token
        })
      });
      
      const backendResult = await responseBackend.json();
      if (!responseBackend.ok || backendResult.error) {
        throw new Error(backendResult.error || "Failed to sync user with database");
      }
      
      const user = {
        id: backendResult.user._id,
        name: backendResult.user.name,
        email: backendResult.user.email,
        image: backendResult.user.image,
        role: backendResult.user.role,
        provider: "google"
      };
      
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("auth-change"));
      
      toast.success(`Welcome, ${user.name}!`);
      const redirectPath = callbackUrl || (user.role === "ADMIN" ? "/admin" : "/");
      router(redirectPath);
    } catch (e) {
      console.error("Failed to handle Google credential response:", e);
      toast.error("Google Authentication failed: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initGoogleAuth = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          { theme: "outline", size: "large", width: "100%", shape: "pill" }
        );
      } else {
        setTimeout(initGoogleAuth, 500);
      }
    };
    initGoogleAuth();
  }, [callbackUrl]);

  return (
    _jsxs("div", { className: "w-full max-w-md mx-auto space-y-8 p-8 glass-card rounded-3xl relative overflow-hidden", children: [
      _jsxs("div", { className: "text-center space-y-2", children: [
        _jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground", children: "Sign In" }),
        _jsx("p", { className: "text-muted-foreground text-sm", children: "Sign in with Google to access your dashboard." })
      ] }),

      _jsxs("div", { className: "space-y-6 pt-4", children: [
        loading && _jsx("div", { className: "flex justify-center", children: _jsx(Loader2, { className: "w-8 h-8 animate-spin text-primary" }) }),
        
        _jsx("div", { id: "google-signin-btn", className: "w-full flex justify-center py-1" })
      ] })
    ] })
  );
}