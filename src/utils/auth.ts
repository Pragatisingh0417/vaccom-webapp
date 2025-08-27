// src/utils/auth.ts

export const getUserToken = (): string | null => {
  if (typeof window !== "undefined") {
    // Make sure this key matches how you store the JWT on login
    return localStorage.getItem("token");
  }
  return null;
};
