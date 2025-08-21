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
        redirectTo: `${window.location.origin}/claim`,
      },
    });
    if (error) console.error("Login error:", error.message);
  }

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) router.push("/dashboard");
    }
    checkUser();
  }, [router]);

  return (
  <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black font-sans">
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      
      {/* LEFT SIDE - Full Height Grid of Cards */}
      <div className="grid grid-cols-2 grid-rows-2 gap-6 p-8">
        <div className="bg-neutral-800 rounded-3xl overflow-hidden shadow-lg">
          <img
            src="promise-shirt.jpg"
            alt="We've got your back"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-yellow-400 rounded-3xl flex items-center justify-center shadow-lg hover:scale-105 transition">
          <p className="text-xl font-bold text-black text-center px-4">
            Promise Scholars, welcome back!
          </p>
        </div>

        <div className="bg-purple-600 rounded-3xl flex items-center justify-center shadow-lg hover:scale-105 transition">
          <p className="text-xl font-semibold text-white text-center px-4">
            Finish strong this semester.
          </p>
        </div>

        <div className="bg-neutral-800 rounded-3xl overflow-hidden shadow-lg">
          <img
            src="test.jpg"
            alt="personalized counseling"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* RIGHT SIDE - Centered Login Section */}
      <div className="flex items-center justify-center px-8 lg:px-16">
        <div className="w-full max-w-md space-y-8">
          {/* Heading */}
          <div>
            <h1 className="text-5xl lg:text-8xl font-extrabold text-white leading-tight">
              Welcome Back <br />
              <span className="text-yellow-400">Scholars</span>
            </h1>
            <p className="mt-4 text-lg text-neutral-400">
              Check your Promise requirements and RSVP for events.
            </p>
          </div>

          {/* Login Button */}
          <div>
            <button
              onClick={handleLogin}
              className="w-full bg-white text-black px-8 py-4 rounded-xl text-lg font-semibold shadow-md hover:bg-neutral-200 transition"
            >
              Continue with Google
            </button>
          </div>

          {/* Footer */}
          <p className="text-sm text-neutral-500">
            Need help? Contact your Promise advisor or visit the Promise office.
          </p>
        </div>
      </div>
    </div>
  </div>
);
}
