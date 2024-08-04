"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function signInAction() {
  // can get all provider from api/auth/providers
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  // common practice in server actions is not to use try catch,
  // just throw error and it will be caught by closest error boundary

  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please enter a valid national ID");

  const updateData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error("💣-> ", error);
    throw new Error("Guest could not be updated");
  }

  // revalidating the page cache is important if we want to display the updated data, through server action, on screen.
  // No need to revalidate the cache on every SA, like contact form.
  // No data is being updated that should be displayed after form submission.
  revalidatePath("/account/profile");
}
