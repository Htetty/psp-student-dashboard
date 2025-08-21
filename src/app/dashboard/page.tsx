// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Content1 from "@/components/Content1";
import Content2 from "@/components/Content2";
import Content3 from "@/components/Content3";
import Top from "@/components/Top";

export default async function DashboardPage() {
  // 1. Require login
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 2. Require claimed profile
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("g_number")
    .eq("user_id", user.id)
    .single();
  if (!profile) redirect("/claim");

  // 3. Fetch student data
  const { data: student } = await supabase
    .from("promisedata")
    .select("*")
    .eq("g_number", profile.g_number)
    .single();
  if (!student) {
    return <div className="text-white/80">No data found for your G-Number.</div>;
  }

  // 4. Render dashboard
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
