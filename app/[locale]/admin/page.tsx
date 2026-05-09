import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import VolunteerActions from "./VolunteerActions";
import MembershipActions from "./MembershipActions";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import MailIcon from "@mui/icons-material/Mail";
import DownloadsIcon from "@mui/icons-material/Downloads";
import Button from "@mui/material/Button";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/login`);

  const serviceClient = await createServiceClient();
  const { data: profile } = await serviceClient.from("profiles").select("role").eq("id", user.id).maybeSingle();

  if (profile?.role !== "admin") redirect(`/${locale}/dashboard`);

  const [
    { count: volunteerCount },
    { count: memberCount },
    { count: donationCount },
    { count: messageCount },
    { data: recentVolunteers },
    { data: recentMembers },
    { data: recentMessages },
    { data: donationStats },
  ] = await Promise.all([
    serviceClient.from("volunteer_applications").select("*", { count: "exact", head: true }),
    serviceClient.from("memberships").select("*", { count: "exact", head: true }).eq("status", "active"),
    serviceClient.from("donations").select("*", { count: "exact", head: true }).eq("status", "completed"),
    serviceClient.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "unread"),
    serviceClient.from("volunteer_applications").select("*").order("created_at", { ascending: false }).limit(5),
    serviceClient.from("memberships").select("*, profiles(full_name, email)").order("created_at", { ascending: false }).limit(5),
    serviceClient.from("contact_messages").select("*").eq("status", "unread").order("created_at", { ascending: false }).limit(5),
    serviceClient.from("donations").select("amount, purpose").eq("status", "completed"),
  ]);

  const totalDonated = donationStats?.reduce((acc, d) => acc + (d.amount ?? 0), 0) ?? 0;

  const stats = [
    { label: "Volunteers Applied", value: volunteerCount ?? 0, icon: <PeopleIcon />, color: "#2D6A4F" },
    { label: "Active Members", value: memberCount ?? 0, icon: <CardMembershipIcon />, color: "#E07B39" },
    { label: "Total Donated", value: `₹${totalDonated.toLocaleString("en-IN")}`, icon: <VolunteerActivismIcon />, color: "#C9920C" },
    { label: "Unread Messages", value: messageCount ?? 0, icon: <MailIcon />, color: "#1565C0" },
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: "#FFFBF5", minHeight: "80vh", py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>Admin Dashboard</Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: "text.secondary", mb: 4 }}
          >
            सेवार्थ पथ संस्थानम् — प्रशासन पैनल
          </Typography>

          <Grid container spacing={3} sx={{ mb: 5 }}>
            {stats.map(({ label, value, icon, color }) => (
              <Grid item xs={12} sm={6} md={3} key={label}>
                <Paper
                  elevation={0}
                  sx={{ p: 3, border: `1px solid ${color}20`, borderRadius: 2, borderTop: `4px solid ${color}` }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ color, opacity: 0.75 }}>{icon}</Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">{label}</Typography>
                      <Typography variant="h5" fontWeight={800} sx={{ color }}>{value}</Typography>
                    </Box>
                  </Stack>
                </Paper>
          </Grid>

          {/* Download All Forms Card */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                border: "2px solid var(--saffron)",
                borderRadius: 2,
                background: "linear-gradient(135deg, rgba(224,123,57,0.03) 0%, white 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                gap: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    bgcolor: "rgba(224,123,57,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                  }}
                >
                  📥
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ color: "var(--saffron)", mb: 0.5 }}
                  >
                    Download All Forms
                    <Box component="span" sx={{ fontWeight: 400, fontSize: "0.9em", color: "text.secondary", ml: 1 }}>
                      — सभी फॉर्म डाउनलोड
                    </Box>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ maxWidth: 600 }}
                  >
                    Get membership, volunteer, and certificate templates in a single ZIP file.
                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                      {" "}Download membership form, volunteer application, ID card, and certificate templates ready for printing.
                    </Box>
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                href="/api/admin/download-forms"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  bgcolor: "var(--green)",
                  "&:hover": { bgcolor: "#1f4f39" },
                  whiteSpace: "nowrap",
                }}
              >
                📥 Download ZIP
              </Button>
            </Paper>
          </Grid>
            ))}
          </Grid>

          <Grid container spacing={4}>
            {/* Recent Volunteers */}
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 3, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Recent Volunteers</Typography>
                <Stack spacing={1.5}>
                  {(recentVolunteers ?? []).map((v) => (
                    <Stack key={v.id} direction="row" justifyContent="space-between" alignItems="center"
                      sx={{ p: 1.5, bgcolor: "rgba(0,0,0,0.02)", borderRadius: 1 }}>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{v.full_name}</Typography>
                        <Typography variant="caption" color="text.secondary">{v.phone} · {v.city}</Typography>
                      </Box>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <VolunteerActions id={v.id} status={v.status} />
                        <Chip label={v.status} size="small"
                          sx={{ bgcolor: v.status === "approved" ? "#2D6A4F20" : "#E07B3920", color: v.status === "approved" ? "#2D6A4F" : "#E07B39", fontWeight: 600 }} />
                      </Stack>
                    </Stack>
                  ))}
                  {!recentVolunteers?.length && (
                    <Typography variant="body2" color="text.secondary">No applications yet.</Typography>
                  )}
                </Stack>
              </Paper>
            </Grid>

            {/* Recent Members */}
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 3, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Recent Members</Typography>
                <Stack spacing={1.5}>
                  {(recentMembers ?? []).map((m) => {
                    const p = m.profiles as { full_name?: string; email?: string } | null;
                    return (
                      <Stack key={m.id} direction="row" justifyContent="space-between" alignItems="center"
                        sx={{ p: 1.5, bgcolor: "rgba(0,0,0,0.02)", borderRadius: 1 }}>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>{p?.full_name ?? "—"}</Typography>
                          <Typography variant="caption" color="text.secondary">{m.plan_code} · {m.public_member_id}</Typography>
                        </Box>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <MembershipActions id={m.id} status={m.status} />
                          <Chip label={m.status} size="small"
                            sx={{ bgcolor: m.status === "active" ? "#2D6A4F20" : "#E07B3920", color: m.status === "active" ? "#2D6A4F" : "#E07B39", fontWeight: 600 }} />
                        </Stack>
                      </Stack>
                    );
                  })}
                  {!recentMembers?.length && (
                    <Typography variant="body2" color="text.secondary">No members yet.</Typography>
                  )}
                </Stack>
              </Paper>
            </Grid>

            {/* Unread Messages */}
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 3, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Unread Contact Messages</Typography>
                {(recentMessages ?? []).length > 0 ? (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><Typography variant="caption" fontWeight={700}>Name</Typography></TableCell>
                        <TableCell><Typography variant="caption" fontWeight={700}>Email</Typography></TableCell>
                        <TableCell><Typography variant="caption" fontWeight={700}>Subject</Typography></TableCell>
                        <TableCell><Typography variant="caption" fontWeight={700}>Date</Typography></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(recentMessages ?? []).map((msg) => (
                        <TableRow key={msg.id}>
                          <TableCell>{msg.full_name}</TableCell>
                          <TableCell>{msg.email}</TableCell>
                          <TableCell>{msg.subject ?? "—"}</TableCell>
                          <TableCell>{new Date(msg.created_at).toLocaleDateString("en-IN")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography variant="body2" color="text.secondary">No unread messages.</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
