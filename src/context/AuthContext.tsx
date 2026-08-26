import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { onAuthStateChanged, type User } from "firebase/auth";

import { auth } from "../firebase/Config";
import { AuthContext } from "./AuthContextCore";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Auth listener started");

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        console.log("Firebase auth state:", currentUser);

        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error("Auth state error:", error);

        setUser(null);
        setLoading(false);
      }
    );

    return () => {
      console.log("Auth listener cleaned up");
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
