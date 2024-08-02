"use server";

import { signIn, signOut } from "./auth";

export async function signInAction() {
  // can get all provider from api/auth/providers
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
