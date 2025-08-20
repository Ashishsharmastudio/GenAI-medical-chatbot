import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  function setSession({ token, user }) {
    if (token) localStorage.setItem("token", token);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      setUser,
      setSession,
      logout,
      async login(email, password) {
        const res = await api.login(email, password);
        setSession(res);
        return res.user;
      },
      async signup(email, password) {
        const res = await api.signup(email, password);
        setSession(res);
        return res.user;
      },
      async google(idToken) {
        const res = await api.googleLogin(idToken);
        setSession(res);
        return res.user;
      },
    }),
    [user]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
