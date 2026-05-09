"use server";

import { createServiceClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function approveVolunteerApplication(id: string) {
  const supabase = await createServiceClient();
  
  const { error } = await supabase
    .from("volunteer_applications")
    .update({ status: "approved" })
    .eq("id", id);
    
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "page");
}

export async function rejectVolunteerApplication(id: string) {
  const supabase = await createServiceClient();
  
  const { error } = await supabase
    .from("volunteer_applications")
    .update({ status: "rejected" })
    .eq("id", id);
    
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "page");
}

export async function updateMembershipStatus(id: string, status: "active" | "expired" | "cancelled") {
  const supabase = await createServiceClient();
  
  const { error } = await supabase
    .from("memberships")
    .update({ status })
    .eq("id", id);
    
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "page");
}
