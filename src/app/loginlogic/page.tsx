"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/claim`, // after login, go claim
      },
    });

    if (error) {
      console.error("Login error:", error.message);
    }
  }

  useEffect(() => {
    // if already logged in, redirect to claim
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push("/claim");
      }
    }
    checkUser();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-gray-600">Sign in with your school Google account</p>

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
