import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardNavbar } from "@/app/components/dashboard/DashboardNavbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch user credits
  const { data: profile } = await supabase
    .from("users")
    .select("credits")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar
        credits={profile?.credits ?? 0}
        email={user.email ?? ""}
      />
      <main className="flex-1">{children}</main>
    </div>
  );
}
