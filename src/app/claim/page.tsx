"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ClaimPage() {
  const [gNumber, setGNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("");

  async function handleClaim() {
    setStatus("Checking...");

    // normalize inputs
    const gnum = gNumber.trim();
    const lname = lastName.trim().toLowerCase();

    // 1. Get logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setStatus("You must be logged in first.");
      return;
    }

    // 2. Check GNumber + Last Name exist (case-insensitive for last name)
    const { data: student, error: studentError } = await supabase
      .from("promisedata")
      .select("g_number, last_name")
      .eq("g_number", gnum)
      .ilike("last_name", `%${lname}%`)  // 👈 case-insensitive match
      .single();

    if (studentError || !student) {
      setStatus("No matching student record found.");
      return;
    }

    // 3. Insert into user_profiles
    const { error: insertError } = await supabase.from("user_profiles").insert({
      user_id: user.id,
      g_number: gnum,
    });

    if (insertError) {
      setStatus("Error claiming GNumber (maybe already claimed).");
      return;
    }

    setStatus("✅ Successfully claimed! You can now go to your dashboard.");
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded-2xl space-y-4">
      <h1 className="text-2xl font-bold">Claim Your GNumber</h1>
      <p className="text-sm text-gray-600">
        Enter your student ID (GNumber) and last name to link your account.
      </p>

      <input
        type="text"
        placeholder="GNumber (e.g., G01333774)"
        value={gNumber}
        onChange={(e) => setGNumber(e.target.value)}
        className="w-full border rounded-lg p-2"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full border rounded-lg p-2"
      />

      <button
        onClick={handleClaim}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Claim My Account
      </button>

      {status && <p className="text-sm text-gray-700 mt-2">{status}</p>}
    </div>
  );
}
