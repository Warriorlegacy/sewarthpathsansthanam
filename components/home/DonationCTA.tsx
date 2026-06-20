"use client";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useLocale } from "next-intl";
import Link from "next/link";

const presets = [
  { amount: 251, label: "₹251" },
  { amount: 501, label: "₹501" },
  { amount: 1001, label: "₹1,001" },
  { amount: 2100, label: "₹2,100" },
  { amount: 5001, label: "₹5,001" },
];

export default function DonationCTA() {
  const locale = useLocale();

  return (
    <Box
      sx={{
        py: 10,
        position: "relative",
        overflow: "hidden",
        background: "rgba(15, 23, 42, 0.4) !important",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Background patterns */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="md" sx={{ position: "relative", textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            color: "#fff",
            fontWeight: 800,
            mb: 1.5,
            fontSize: { xs: "1.8rem", md: "2.4rem" },
            textShadow: "0 0 15px rgba(255,255,255,0.1)",
          }}
        >
          आपका एक कदम किसी की जिंदगी बदल सकता है
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "rgba(255,255,255,0.7)", mb: 5, fontWeight: 400 }}
        >
          Your one step can change someone's life
        </Typography>

        {/* Quick amount chips */}
        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="center"
          flexWrap="wrap"
          sx={{ mb: 5, gap: 1.5 }}
        >
          {presets.map(({ label }) => (
            <Chip
              key={label}
              label={label}
              component={Link}
              href={`/${locale}/donate`}
              clickable
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                height: 44,
                px: 1.5,
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "rgba(224, 123, 57, 0.25)",
                  borderColor: "#E07B39",
                  boxShadow: "0 0 15px rgba(224, 123, 57, 0.4)",
                },
              }}
            />
          ))}
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} justifyContent="center" alignItems="center">
          <Button
            component={Link}
            href={`/${locale}/donate`}
            variant="contained"
            size="large"
            startIcon={<VolunteerActivismIcon />}
            className="light-streak"
            sx={{
              background: "linear-gradient(135deg, #E07B39 0%, #a855f7 100%)",
              boxShadow: "0 8px 30px rgba(168, 85, 247, 0.4)",
              color: "#fff",
              fontWeight: 800,
              fontSize: "1.05rem",
              py: 1.8,
              px: 4.5,
              minHeight: 54,
              borderRadius: "30px",
              "&:hover": {
                background: "linear-gradient(135deg, #a855f7 0%, #E07B39 100%)",
                boxShadow: "0 12px 35px rgba(168, 85, 247, 0.6)",
              },
            }}
          >
            {locale === "hi" ? "अभी दान करें" : "Donate Now"}
          </Button>
          <Button
            component={Link}
            href={`/${locale}/membership`}
            variant="outlined"
            size="large"
            sx={{
              borderColor: "rgba(255,255,255,0.15)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1rem",
              py: 1.8,
              px: 4.5,
              minHeight: 54,
              borderRadius: "30px",
              background: "rgba(255,255,255,0.03)",
              "&:hover": {
                borderColor: "#E07B39",
                background: "rgba(224, 123, 57, 0.1)",
                boxShadow: "0 0 20px rgba(224, 123, 57, 0.25)",
              },
            }}
          >
            {locale === "hi" ? "सदस्य बनें" : "Become a Member"}
          </Button>
        </Stack>

        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)", display: "block", mt: 4 }}>
          {locale === "hi"
            ? "80G प्रमाण पत्र प्रक्रियाधीन। सभी दानों के लिए रसीद जारी की जाती है।"
            : "80G certification in process. Receipt issued for all donations."}
        </Typography>
      </Container>
    </Box>
  );
}
