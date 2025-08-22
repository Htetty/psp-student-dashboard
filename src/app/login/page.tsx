"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageCarousel from "@/components/login/ImageCarousel";
import ClaimPage from "@/components/login/ClaimPage";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkingClaim, setCheckingClaim] = useState(false);
  const [needsClaim, setNeedsClaim] = useState(false);

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) console.error("Login error:", error.message);
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      setUser(user);
      setLoading(false);

      if (user) {
        setCheckingClaim(true);
        const { data: profile, error } = await supabase
          .from("user_profiles")
          .select("g_number")
          .eq("user_id", user.id)
          .maybeSingle();

        setCheckingClaim(false);

        if (!error && profile) {
          router.replace("/dashboard");
        } else {
          setNeedsClaim(true);
        }
      }
    })();
    return () => { mounted = false; };
  }, [router]);


  return (
    <div className="min-h-screen font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* LEFT SIDE */}
        <div className="grid grid-cols-2 grid-rows-2 gap-6 p-8">
          <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="images/promise-shirt.jpg"
              alt="We've got your back"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="shadow-lg hover:scale-105 transition p-0">
            <ImageCarousel
              images={[
                { src: "/images/sliderTop/01.jpg", alt: "" },
                { src: "/images/sliderTop/02.jpg", alt: "" },
                { src: "/images/sliderTop/03.jpg", alt: "" },
                { src: "/images/sliderTop/04.jpg", alt: "" },
                { src: "/images/sliderTop/05.jpg", alt: "" },
              ]}
            />
          </div>

          <div className="shadow-lg hover:scale-105 transition p-0">
            <ImageCarousel
              images={[
                { src: "/images/sliderBottom/coun1.jpg", alt: "Kent" },
                { src: "/images/sliderBottom/coun2.jpg", alt: "Matt" },
                { src: "/images/sliderBottom/coun3.jpg", alt: "Manny" },
                { src: "/images/sliderBottom/coun4.jpg", alt: "Mikayla" },
                { src: "/images/sliderBottom/coun5.jpg", alt: "Jeremy" },
                { src: "/images/sliderBottom/coun6.jpg", alt: "Albin" },
                { src: "/images/sliderBottom/coun7.jpg", alt: "Dino" },
                { src: "/images/sliderBottom/coun8.jpg", alt: "Kim" },
                { src: "/images/sliderBottom/coun9.jpg", alt: "Lucy" },
                { src: "/images/sliderBottom/coun10.jpg", alt: "Angelica" },
                { src: "/images/sliderBottom/coun11.jpg", alt: "Angela" },
                { src: "/images/sliderBottom/coun12.jpg", alt: "Andrea" },
                { src: "/images/sliderBottom/coun13.jpg", alt: "Mandy" },
              ]}
            />
          </div>

          <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="images/test.jpg"
              alt="personalized counseling"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-8 lg:px-16">
          <div className="w-full max-w-md space-y-8">
            {!loading && !user && (
              <>
                <div>
                  <h1 className="text-5xl lg:text-8xl font-extrabold text-white leading-tight">
                    Welcome Back <br />
                    <span className="text-yellow-400">Scholars</span>
                  </h1>
                  <p className="mt-4 text-lg text-neutral-400">
                    Check your Promise requirements and RSVP for events.
                  </p>
                </div>

                <div>
                  <button
                    onClick={handleLogin}
                    className="w-full bg-white text-black px-8 py-4 rounded-xl text-lg font-semibold shadow-md hover:bg-neutral-200 transition"
                  >
                    Continue with Google
                  </button>
                </div>

                <p className="text-sm text-neutral-500">
                  Need help? Contact your Promise advisor or visit the Promise office.
                </p>
              </>
            )}

            {user && checkingClaim && <p className="text-neutral-400">Checking your account…</p>}

            {user && !checkingClaim && needsClaim && <ClaimPage />}
          </div>
        </div>
      </div>
    </div>
  );
}
