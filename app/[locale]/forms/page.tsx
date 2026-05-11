import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import BadgeIcon from "@mui/icons-material/Badge";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ArticleIcon from "@mui/icons-material/Article";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Link from "next/link";

export default function FormsPage() {
  const forms = [
    {
      id: "membership",
      title: "Membership Application Form",
      titleHi: "सदस्यता आवेदन फॉर्म",
      description: "Apply for membership in Sewarth Path Sansthanam. Download, fill, and submit.",
      icon: <CardMembershipIcon sx={{ fontSize: 40, color: "#E07B39" }} />,
      downloadUrl: "/api/admin/download-forms?type=membership",
      category: "Membership",
      categoryHi: "सदस्यता",
    },
    {
      id: "volunteer",
      title: "Volunteer Registration Form",
      titleHi: "स्वयंसेवक पंजीकरण फॉर्म",
      description: "Register as a volunteer to contribute your time and skills.",
      icon: <HowToRegIcon sx={{ fontSize: 40, color: "#2D6A4F" }} />,
      downloadUrl: "/api/admin/download-forms?type=volunteer",
      category: "Volunteer",
      categoryHi: "स्वयंसेवक",
    },
    {
      id: "donation",
      title: "Donation Form",
      titleHi: "दान फॉर्म",
      description: "Fill out this form for bank transfers or in-kind donations.",
      icon: <ArticleIcon sx={{ fontSize: 40, color: "#C9920C" }} />,
      downloadUrl: "/api/admin/download-forms?type=donation",
      category: "Donation",
      categoryHi: "दान",
    },
    {
      id: "id-card",
      title: "Digital ID Card Request",
      titleHi: "डिजिटल आईडी कार्ड अनुरोध",
      description: "Request your official NGO digital ID card with QR verification.",
      icon: <BadgeIcon sx={{ fontSize: 40, color: "#1565C0" }} />,
      downloadUrl: "/api/admin/download-forms?type=id-card",
      category: "ID Card",
      categoryHi: "आईडी कार्ड",
    },
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: "#FFFBF5", minHeight: "80vh", py: 6 }}>
        <Container maxWidth="lg">
          {/* Header Section */}
          <Stack spacing={2} sx={{ mb: 6, textAlign: "center" }}>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{ color: "primary.main", fontSize: { xs: "2rem", md: "2.5rem" } }}
            >
              📋 Forms & Downloads
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                color: "text.secondary",
              }}
            >
              फॉर्म और डाउनलोड — Access all official forms
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth={600} mx="auto">
              Download official forms for membership, volunteer registration, donations,
              and more. All forms are available in both English and Hindi.
            </Typography>
          </Stack>

          {/* Download All Forms Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 5,
              border: "2px solid #E07B39",
              borderRadius: 3,
              background: "linear-gradient(135deg, rgba(224,123,57,0.05) 0%, white 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: { xs: "wrap", md: "nowrap" },
              gap: 3,
            }}
          >
            <Stack direction="row" spacing={3} alignItems="center" sx={{ flex: 1 }}>
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: 2,
                  bgcolor: "rgba(224,123,57,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  flexShrink: 0,
                }}
              >
                📥
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ color: "#E07B39", mb: 0.5 }}
                >
                  Download All Forms
                  <Box component="span" sx={{ fontWeight: 400, fontSize: "0.9em", color: "text.secondary", ml: 1 }}>
                    — सभी फॉर्म डाउनलोड करें
                  </Box>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500 }}>
                  Get all forms in a single ZIP file — membership form, volunteer application,
                  ID card request, donation form, and certificate templates.
                </Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              size="large"
              href="/api/admin/download-forms"
              startIcon={<DownloadIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                bgcolor: "#E07B39",
                "&:hover": { bgcolor: "#c96a32" },
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              📥 Download All ZIP
            </Button>
          </Paper>

          {/* Individual Forms Grid */}
          <Grid container spacing={3}>
            {forms.map((form) => (
              <Grid item xs={12} sm={6} md={4} key={form.id}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            bgcolor: "rgba(0,0,0,0.03)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {form.icon}
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: "rgba(0,0,0,0.05)",
                            color: "text.secondary",
                            fontWeight: 600,
                          }}
                        >
                          {form.category}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                          {form.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "'Noto Sans Devanagari', sans-serif",
                            color: "text.secondary",
                            mb: 1,
                          }}
                        >
                          {form.titleHi}
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        {form.description}
                      </Typography>

                      <Button
                        variant="outlined"
                        color="primary"
                        href={form.downloadUrl}
                        startIcon={<DownloadIcon />}
                        fullWidth
                        sx={{ mt: 1 }}
                      >
                        Download PDF
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Info Section */}
          <Paper
            elevation={0}
            sx={{
              mt: 5,
              p: 4,
              bgcolor: "#2D6A4F",
              color: "white",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Need Help with Forms?
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
              Contact us for assistance with filling out forms or any queries about membership and volunteering.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                component={Link}
                href="/en/contact"
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "#2D6A4F",
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                Contact Us
              </Button>
              <Button
                component={Link}
                href="/en/membership"
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                Apply for Membership
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
}