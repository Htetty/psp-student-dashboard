"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Content1 from "@/components/dashboard/Content1";
import Content2 from "@/components/dashboard/Content2";
import Content3 from "@/components/dashboard/Content3";
import Sidebar from "@/components/dashboard/Sidebar";
import Top from "@/components/dashboard/Top";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("g_number")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!profile) {
        router.replace("/login");
        return;
      }

      const { data: student } = await supabase
        .from("promisedata")
        .select("*")
        .eq("g_number", profile.g_number)
        .maybeSingle();

      if (mounted) {
        setStudent(student);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [router]);

  if (loading) return <div className="text-white/80 p-6">Loading…</div>;
  if (!student) return <div className="text-white/80 p-6">No data found for your G‑Number.</div>;

  return (
    <>
      <Top />
      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Content1 className="rounded-3xl" student={student} />
        <Content2 className="rounded-3xl" />
      </section>
      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Content3 className="rounded-3xl min-h-[20rem]" />
        <div className="rounded-3xl bg-[#FDD06E]" />
      </section>
    </>
  );
}
