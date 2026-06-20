"use client";

import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Chip,
  Avatar,
  Snackbar,
  Button,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VerifiedIcon from "@mui/icons-material/Verified";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import { useCallback, useState } from "react";

interface MembershipData {
  id: string;
  status: string;
  plan_code: string;
  created_at: string;
  expires_at: string | null;
  public_member_id: string;
  profiles: {
    full_name: string | null;
    email: string | null;
    city: string | null;
    state: string | null;
  } | null;
}

const planColors: Record<string, string> = {
  VOL_FREE: "#2D6A4F",
  ANNUAL_365: "#E07B39",
  SUPPORTER_1001: "#C9920C",
  LIFETIME_5001: "#6B3A1F",
};

export default function ClientWrapper({
  params,
  membership,
  planLabels,
}: {
  params: { public_member_id: string; locale: string };
  membership: MembershipData | null;
  planLabels: Record<string, string>;
}) {
  const isValid = membership && membership.status === "active";
  const color = membership ? (planColors[membership.plan_code] || "#E07B39") : "#757575";
  const profile = membership?.profiles;

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const verificationUrl = `https://sewarthpathsansthanam.vercel.app/${params.locale}/verify/${params.public_member_id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verificationUrl)}`;

  const t = (key: string) => {
    const hiMap: Record<string, string> = {
      title: "सदस्य सत्यापन",
      subtitle: "सदस्य या स्वयंसेवक ID की प्रामाणिकता की पुष्टि करें",
      downloadQR: "QR डाउनलोड करें",
      printCard: "कार्ड प्रिंट करें",
      memberSince: "सदस्य से",
      validUntilLabel: "तक मान्य",
      membership: "सदस्यता",
      lifetime: "आजीवन",
      id: "आईडी",
      idCopied: "मेंबर ID कॉपी किया गया!",
      notVerified: "सत्यापित नहीं",
      descriptionHi: "यह सदस्यता ID सत्यापित नहीं हो सकी। सदस्यता असक्रिय हो सकती है या ID गलत हो सकती है।",
      verified: "सत्यापित",
      status: "स्थिति",
      memberName: "नाम",
      memberType: "सदस्यता प्रकार",
      validFrom: "से मान्य",
      validUntil: "तक मान्य",
    };
    const enMap: Record<string, string> = {
      title: "Member Verification",
      subtitle: "Verify the authenticity of a member or volunteer ID",
      downloadQR: "Download QR",
      printCard: "Print Card",
      memberSince: "Member Since",
      validUntilLabel: "Valid Until",
      membership: "Membership",
      lifetime: "Lifetime",
      id: "ID",
      idCopied: "Member ID copied to clipboard!",
      notVerified: "Not Verified",
      descriptionHi: "This membership ID could not be verified. The membership may be inactive or the ID may be incorrect.",
      verified: "Verified",
      status: "Status",
      memberName: "Name",
      memberType: "Membership Type",
      validFrom: "Valid From",
      validUntil: "Valid Until",
    };
    const map = params.locale === "hi" ? hiMap : enMap;
    return map[key] || key;
  };

  const handleCopyId = useCallback(() => {
    navigator.clipboard.writeText(params.public_member_id);
    setSnackbar({ open: true, message: t("idCopied") });
  }, [params.public_member_id, t]);

  const handleDownloadQR = useCallback(() => {
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `sewarth-qr-${params.public_member_id}.png`;
    link.click();
  }, [qrCodeUrl, params.public_member_id]);

  const handlePrint = useCallback(() => {
    if (typeof window !== "undefined" && window.print) {
      window.print();
    }
  }, []);

  const getPlanLabel = (code: string) => planLabels[code] || code;

  const createdAt = membership?.created_at
    ? new Date(membership.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "";

  const expiresAt = membership?.expires_at
    ? new Date(membership.expires_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : null;

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        bgcolor: "transparent",
        minHeight: "70vh",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            {t("title")}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              color: "text.secondary",
            }}
          >
            {t("subtitle")}
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            border: `2px solid ${isValid ? color : "#d32f2f"}`,
            borderRadius: 3,
            textAlign: "center",
            bgcolor: isValid ? "background.paper" : "error.background",
            position: "relative",
          }}
        >
          {isValid && (
            <Box
              sx={{
                position: "absolute",
                top: { xs: -12, md: -16 },
                right: { xs: -12, md: -16 },
                transform: "rotate(12deg)",
                bgcolor: "success.main",
                color: "white",
                fontWeight: 900,
                fontSize: { xs: "0.75rem", md: "0.875rem" },
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                boxShadow: 3,
                letterSpacing: 1,
                zIndex: 10,
              }}
            >
              VERIFIED
            </Box>
          )}

          {isValid ? (
            <Stack spacing={2} alignItems="center">
              <CheckCircleIcon sx={{ fontSize: { xs: 48, md: 64 }, color, mb: 1 }} />
              <Chip
                icon={<VerifiedIcon />}
                label="VERIFIED MEMBER"
                sx={{
                  bgcolor: `${color}15`,
                  color,
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  mb: 1,
                  px: 1,
                }}
              />

              {/* Member Avatar with verified checkmark overlay */}
              <Box sx={{ position: "relative" }}>
                <Avatar
                  sx={{
                    width: { xs: 64, md: 72 },
                    height: { xs: 64, md: 72 },
                    bgcolor: `${color}20`,
                    color,
                    fontSize: { xs: "1.5rem", md: "1.75rem" },
                    fontWeight: 700,
                  }}
                >
                  {profile?.full_name?.[0] ?? "?"}
                </Avatar>
                {isValid && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -2,
                      right: -2,
                      bgcolor: "background.paper",
                      borderRadius: "50%",
                    }}
                  >
                    <VerifiedIcon sx={{ fontSize: 20, color: "success.main" }} />
                  </Box>
                )}
              </Box>

              <Box>
                <Typography variant="h5" fontWeight={700}>
                  {profile?.full_name ?? "Member"}
                </Typography>
                {profile?.city && (
                  <Typography variant="body2" color="text.secondary">
                    {profile.city}
                    {profile.state ? `, ${profile.state}` : ""}
                  </Typography>
                )}
              </Box>

              <Chip
                label={getPlanLabel(membership!.plan_code)}
                sx={{
                  bgcolor: color,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                }}
              />

              {/* Tier-specific color bar */}
              <Box sx={{ width: "100%", height: 4, bgcolor: color, borderRadius: 2, mt: 1 }} />

              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={3}
                sx={{ mt: 1, width: "100%" }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    {t("memberSince")}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {createdAt}
                  </Typography>
                </Box>
                {expiresAt ? (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                      {t("validUntilLabel")}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {expiresAt}
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                      {t("membership")}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color }}>
                      {t("lifetime")}
                    </Typography>
                  </Box>
                )}
              </Stack>

              {/* Member ID with Copy Button */}
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "grey.100",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  border: `1px dashed ${color}`,
                  width: "100%",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {t("id")}:
                </Typography>
                <Chip
                  label={params.public_member_id}
                  onClick={handleCopyId}
                  onDelete={handleCopyId}
                  deleteIcon={<ContentCopyIcon />}
                  sx={{
                    bgcolor: "white",
                    border: `1px solid ${color}`,
                    color: "text.primary",
                    fontWeight: 600,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: `${color}10`,
                    },
                    "& .MuiChip-deleteIcon": {
                      color,
                    },
                  }}
                />
              </Box>

              {/* QR Code Section */}
              <Stack spacing={1} alignItems="center" sx={{ mt: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {t("downloadQR")}
                </Typography>
                <Box
                  sx={{
                    position: "relative",
                    border: `2px solid ${color}`,
                    borderRadius: 2,
                    p: 1,
                    bgcolor: "white",
                  }}
                >
                  <img
                    src={qrCodeUrl}
                    alt="Verification QR Code"
                    width={150}
                    height={150}
                    style={{ display: "block" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      bgcolor: color,
                      borderRadius: "50%",
                    }}
                  >
                    <IconButton size="small" onClick={handleDownloadQR} sx={{ color: "white" }}>
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Stack>

              {/* Print Button */}
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={handlePrint}
                sx={{
                  mt: 2,
                  borderColor: color,
                  color: color,
                  "&:hover": {
                    bgcolor: `${color}10`,
                    borderColor: color,
                  },
                }}
              >
                {t("printCard")}
              </Button>
            </Stack>
          ) : (
            <Stack spacing={2} alignItems="center">
              <CancelIcon sx={{ fontSize: { xs: 48, md: 64 }, color: "#d32f2f", mb: 2 }} />
              <Typography variant="h5" fontWeight={700} color="error" gutterBottom>
                {t("notVerified")}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t("descriptionHi")}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                  color: "text.secondary",
                  mt: 1,
                }}
              >
                यह सदस्यता ID सत्यापित नहीं हो सकी। सदस्यता असक्रिय हो सकती है या ID गलत हो सकती है।
              </Typography>
            </Stack>
          )}
        </Paper>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", textAlign: "center", mt: 3 }}
        >
          Verified by Sewarth Path Sansthanam · सेवार्थ पथ संस्थानम्
        </Typography>
      </Container>
    </Box>
  );
}
