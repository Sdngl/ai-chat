import { useContext } from "react";

import { AuthContext, type AuthContextType } from "./AuthContextCore";

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
