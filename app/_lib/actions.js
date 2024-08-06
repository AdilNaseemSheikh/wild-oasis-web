"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  // can get all provider from api/auth/providers
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function deleteReservation(bookingId) {
  // await new Promise((res) => setTimeout(res, 1000));

  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session?.user?.guestId);

  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session?.user?.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  const id = +formData.get("bookingId");

  if (!guestBookingsIds.includes(id))
    throw new Error("You are not allowed to delete this booking");

  const observations = formData.get("observations");
  const numGuests = formData.get("numGuests");
  const updateData = { observations, numGuests, id };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${id}`);
  revalidatePath(`/account/reservations/`);
  redirect("/account/reservations");
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
