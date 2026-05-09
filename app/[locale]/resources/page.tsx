"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tabs,
  Tab,
  Alert,
  Snackbar,
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

  const handleDownload = (itemKey: string) => {
    setSnackbarOpen(true);
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
              Download
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
      </Container>
    </Box>
  );
}
