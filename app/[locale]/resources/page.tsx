"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Stack,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useTranslations, useLocale } from "next-intl";

const documents = [
  {
    key: "trustDeed",
    icon: <PictureAsPdfIcon sx={{ fontSize: 40 }} />,
    color: "#E07B39",
  },
  {
    key: "registrationCertificate",
    icon: <PictureAsPdfIcon sx={{ fontSize: 40 }} />,
    color: "#2D6A4F",
  },
  {
    key: "panCard",
    icon: <InsertDriveFileIcon sx={{ fontSize: 40 }} />,
    color: "#C9920C",
  },
  {
    key: "ngoDarpan",
    icon: <InsertDriveFileIcon sx={{ fontSize: 40 }} />,
    color: "#6B3A1F",
  },
  {
    key: "annualReport",
    icon: <PictureAsPdfIcon sx={{ fontSize: 40 }} />,
    color: "#E07B39",
  },
  {
    key: "bankPassbook",
    icon: <InsertDriveFileIcon sx={{ fontSize: 40 }} />,
    color: "#2D6A4F",
  },
];

const forms = [
  {
    key: "membershipForm",
    icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
    color: "#E07B39",
  },
  {
    key: "volunteerForm",
    icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
    color: "#2D6A4F",
  },
  {
    key: "idCardTemplate",
    icon: <InsertDriveFileIcon sx={{ fontSize: 40 }} />,
    color: "#C9920C",
  },
  {
    key: "certificateTemplate",
    icon: <InsertDriveFileIcon sx={{ fontSize: 40 }} />,
    color: "#6B3A1F",
  },
];

export default function ResourcesPage() {
  const t = useTranslations("resources");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [bankDialogOpen, setBankDialogOpen] = useState(false);

  const handleDownload = (itemKey: string) => {
    if (itemKey === "bankPassbook") {
      setBankDialogOpen(true);
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderCard = (itemKey: string, icon: React.ReactNode, color: string) => {
    const docData = t.raw(`documents.${itemKey}`) as { title: string; desc: string; size: string } | undefined;
    const formData = t.raw(`forms.${itemKey}`) as { title: string; desc: string; size: string } | undefined;
    const data = activeTab === 0 ? docData : formData;

    if (!data) return null;

    const isHindiTitle = activeTab === 0 && itemKey === "trustDeed";

    return (
      <Grid item xs={12} sm={6} lg={4} key={itemKey}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            border: `1px solid ${color}20`,
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: `0 12px 40px ${color}25`,
            },
          }}
        >
          <CardContent sx={{ flex: 1, p: 3 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: 2,
                bgcolor: `${color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: color,
                mb: 2,
              }}
            >
              {icon}
            </Box>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                fontFamily: isHindiTitle ? "'Noto Sans Devanagari', sans-serif" : "inherit",
                mb: 1,
                lineHeight: 1.3,
              }}
            >
              {data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
              {data.desc}
            </Typography>
            <Box sx={{ mt: "auto" }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                {data.size}
              </Typography>
            </Box>
          </CardContent>
          <Box sx={{ p: 2, pt: 0 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleDownload(itemKey)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {itemKey === "bankPassbook" 
                ? (locale === "hi" ? "विवरण देखें" : "View Details")
                : "Download"}
            </Button>
          </Box>
        </Card>
      </Grid>
    );
  };

  return (
    <Box sx={{ py: 6, bgcolor: "#FFFBF5", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              color: "#E07B39",
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              mb: 1,
            }}
          >
            {t("title")}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto", mb: 1 }}
          >
            {t("subtitle")}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto", fontStyle: "italic" }}
          >
            {t("note")}
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 2, borderColor: "#E07B3910", mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            centered
            sx={{
              "& .MuiTab-root": {
                fontWeight: 600,
                fontSize: "1rem",
                py: 2,
                px: 3,
                textTransform: "none",
              },
              "& .Mui-selected": {
                color: "#E07B39",
              },
              "& .MuiTabs-indicator": {
                height: 3,
                bgcolor: "#E07B39",
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab label={t("tabs.documents")} />
            <Tab label={t("tabs.forms")} />
          </Tabs>
        </Box>

        <Grid container spacing={3}>
          {activeTab === 0
            ? documents.map((item) => renderCard(item.key, item.icon, item.color))
            : forms.map((item) => renderCard(item.key, item.icon, item.color))}
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="info"
            variant="filled"
            sx={{ bgcolor: "#2D6A4F", fontWeight: 500 }}
          >
            {t("comingSoon")}
          </Alert>
        </Snackbar>

        <Dialog
          open={bankDialogOpen}
          onClose={() => setBankDialogOpen(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3, p: 1 }
          }}
        >
          <DialogTitle fontWeight={800} sx={{ pb: 1, color: "primary.main" }}>
            {locale === "hi" ? "🏛️ बैंक खाता और क्यूआर कोड" : "🏛️ Bank & Payment details"}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              {/* QR Code */}
              <Box sx={{ textAlign: "center" }}>
                <Box
                  component="img"
                  src="/images/payment-qr.jpg"
                  alt="UPI QR Code"
                  sx={{
                    width: "100%",
                    maxWidth: 220,
                    height: "auto",
                    mx: "auto",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 2,
                    p: 0.5,
                    bgcolor: "#fff"
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1, fontWeight: 700 }}>
                  UPI ID: SEWARTHPATH482@iob
                </Typography>
              </Box>

              <Divider />

              {/* Table details */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  { label: locale === "hi" ? "नाम (Account Name)" : "Account Name", value: "SEWARTH PATH SANSTHANAM" },
                  { label: locale === "hi" ? "बैंक (Bank Name)" : "Bank Name", value: "Indian Overseas Bank (IOB)" },
                  { label: locale === "hi" ? "खाता संख्या (A/c No.)" : "Account Number", value: "365302000000482" },
                  { label: locale === "hi" ? "IFSC कोड" : "IFSC Code", value: "IOBA0000370" },
                  { label: locale === "hi" ? "शाखा (Branch)" : "Branch", value: "Varanasi (Lahurabir Main Crossing)" },
                ].map((item) => (
                  <Box key={item.label} sx={{ display: "flex", justifyContent: "space-between", pb: 0.75, borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="caption" fontWeight={700} sx={{ pl: 2, textAlign: "right" }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Alert severity="info" icon={false} sx={{ py: 0.5 }}>
                <Typography variant="caption" sx={{ display: "block", lineHeight: 1.4 }}>
                  {locale === "hi"
                    ? "सत्यापन और दान रसीद प्राप्त करने के लिए कृपया स्क्रीनशॉट व्हाट्सएप पर भेजें: +91 9454222116"
                    : "For verification & receipt, please send payment screenshot on WhatsApp: +91 9454222116"}
                </Typography>
              </Alert>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setBankDialogOpen(false)}
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              {locale === "hi" ? "बंद करें" : "Close"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
