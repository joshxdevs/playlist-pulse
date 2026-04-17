import React, { createContext, useContext } from "react";
import { useSession, signIn, signOut, signUp } from "../lib/auth-client";
import type { User } from "../types";

interface AuthContextValue {
  user: User | null;
  isPending: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();

  async function login(email: string, password: string) {
    const result = await signIn.email({ email, password });
    if (result.error) throw new Error(result.error.message || "Login failed");
  }

  async function register(name: string, email: string, password: string) {
    const result = await signUp.email({ name, email, password });
    if (result.error) throw new Error(result.error.message || "Registration failed");
  }

  async function logout() {
    await signOut();
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider
      value={{
        user: session?.user
          ? { id: session.user.id, email: session.user.email, name: session.user.name }
          : null,
        isPending,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
