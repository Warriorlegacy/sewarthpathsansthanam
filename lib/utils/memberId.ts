export async function generateMemberId(supabase: any): Promise<string> {
  const year = new Date().getFullYear();
  const { count } = await supabase
    .from("memberships")
    .select("*", { count: "exact", head: true })
    .ilike("public_member_id", `SPS-M-${year}-%`);

  const sequence = (count || 0) + 1;
  return `SPS-M-${year}-${String(sequence).padStart(4, '0')}`;
}

export async function generateVolunteerId(supabase: any): Promise<string> {
  const year = new Date().getFullYear();
  const { count } = await supabase
    .from("volunteer_applications")
    .select("*", { count: "exact", head: true })
    .ilike("volunteer_id", `SPS-V-${year}-%`);

  const sequence = (count || 0) + 1;
  return `SPS-V-${year}-${String(sequence).padStart(4, '0')}`;
}
