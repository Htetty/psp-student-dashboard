"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ClaimPage() {
  const router = useRouter();
  const [gNumber, setGNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // If user is already logged in AND already claimed, bounce straight to dashboard
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: existing } = await supabase
        .from("user_profiles")
        .select("g_number")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existing?.g_number) {
        router.replace("/dashboard");
      }
    })();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  async function handleClaim() {
    if (submitting) return;
    setSubmitting(true);
    setStatus("Checking...");

    const gnum = gNumber.trim();
    const lname = lastName.trim().toLowerCase();

    // 1) Require login
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      setStatus("You must be logged in first.");
      setSubmitting(false);
      return;
    }

    // 2) Validate student exists (case-insensitive last name)
    const { data: student, error: studentError } = await supabase
      .from("promisedata")
      .select("g_number, last_name")
      .eq("g_number", gnum)
      .ilike("last_name", `%${lname}%`)
      .maybeSingle();

    if (studentError || !student) {
      setStatus("No matching student record found.");
      setSubmitting(false);
      return;
    }

    // 3) If already claimed by this user, go to dashboard
    const { data: existing } = await supabase
      .from("user_profiles")
      .select("g_number")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing?.g_number) {
      setStatus("Already claimed. Redirecting…");
      router.replace("/dashboard");
      return;
    }

    // 4) Try to claim
    const { error: insertError } = await supabase
      .from("user_profiles")
      .insert({ user_id: user.id, g_number: gnum });

    if (insertError) {
      // If you have a unique constraint on g_number, this catches "already claimed by someone"
      setStatus("Error claiming GNumber. It may already be claimed.");
      setSubmitting(false);
      return;
    }

    setStatus("Successfully claimed! Taking you to your dashboard…");
    router.replace("/dashboard");
  }

  return (
    <div className="bg-neutral-900 rounded-2xl shadow-lg p-10 space-y-6 text-center">
      <h1 className="text-4xl font-extrabold text-white">
        Claim Your <span className="text-yellow-400">GNumber</span>
      </h1>
      <p className="text-neutral-400 text-lg">
        Link your account to continue to your dashboard.
      </p>

      <input
        type="text"
        placeholder="GNumber (e.g., G01234567)"
        value={gNumber}
        onChange={(e) => setGNumber(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
        autoComplete="off"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
        autoComplete="off"
      />

      <button
        onClick={handleClaim}
        disabled={submitting}
        className="w-full bg-yellow-400 text-black py-3 rounded-xl font-semibold text-xl shadow-md hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {submitting ? "Claiming…" : "Claim My Account"}
      </button>

      <button
        onClick={handleLogout}
        className="w-full bg-white text-black py-2 rounded-xl text-lg font-semibold shadow-md hover:bg-neutral-200 transition"
      >
        Back to Login
      </button>

      {status && <p className="text-neutral-300 text-md mt-4">{status}</p>}
    </div>
  );
}
