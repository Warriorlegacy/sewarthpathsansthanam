import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createServiceClient } from "@/lib/supabase/server";
import ClientWrapper from "./ClientWrapper";

interface Props {
  params: { public_member_id: string; locale: string };
}

const planLabels: Record<
  string,
  Record<string, string>
> = {
  en: {
    VOL_FREE: "Volunteer Member",
    ANNUAL_365: "Annual Member",
    SUPPORTER_1001: "Supporter Member",
    LIFETIME_5001: "Lifetime Patron",
  },
  hi: {
    VOL_FREE: "स्वयंसेवक सदस्य",
    ANNUAL_365: "वार्षिक सदस्य",
    SUPPORTER_1001: "समर्थक सदस्य",
    LIFETIME_5001: "आजीवन संरक्षक",
  },
};

export default async function VerifyPage({ params }: Props) {
  const supabase = await createServiceClient();

  const { data: membership } = await supabase
    .from("memberships")
    .select(`
      id,
      status,
      plan_code,
      created_at,
      expires_at,
      public_member_id,
      profiles (
        full_name,
        email,
        city,
        state
      )
    `)
    .eq("public_member_id", params.public_member_id)
    .maybeSingle();

  return (
    <>
      <Navbar />
      <main>
        <ClientWrapper
          params={params}
          membership={membership}
          planLabels={planLabels[params.locale] || planLabels.en}
        />
      </main>
      <Footer />
    </>
  );
}
