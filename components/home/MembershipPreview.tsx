"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const tiers = [
  { key: "volunteer", featured: false, color: "#52B788" }, // Green
  { key: "annual", featured: true, color: "#E07B39" },      // Saffron
  { key: "supporter", featured: false, color: "#C9920C" },  // Gold
  { key: "lifetime", featured: false, color: "#a855f7" },   // Purple
];

export default function MembershipPreview() {
  const t = useTranslations("membership");
  const locale = useLocale();

  return (
    <Box sx={{ py: 10, position: "relative" }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              mb: 1.5,
              color: "#ffffff",
              fontSize: { xs: "2rem", md: "2.6rem" },
              letterSpacing: "-0.01em",
            }}
          >
            {t("title")}
          </Typography>
          <hr className="section-divider" style={{ margin: "12px auto 16px" }} />
          <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.7)" }}>
            {t("subtitle")}
          </Typography>
        </Box>

        {/* Membership Tier Cards */}
        <Grid container spacing={3.5} alignItems="stretch">
          {tiers.map(({ key, featured, color }) => {
            const tierData = t.raw(`tiers.${key}`) as {
              name: string;
              nameHi: string;
              price: string;
              period: string;
              tagline: string;
              benefits: string[];
            };
            return (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid",
                    borderColor: featured ? color : "rgba(255, 255, 255, 0.08)",
                    background: "rgba(15, 23, 42, 0.45) !important",
                    backdropFilter: "blur(12px) saturate(180%)",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "20px",
                    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    boxShadow: featured ? `0 0 25px ${color}20` : "none",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: color,
                      boxShadow: `0 12px 35px ${color}35`,
                    },
                  }}
                >
                  {featured && (
                    <>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: `linear-gradient(90deg, ${color}, #C9920C)`,
                        }}
                      />
                      <Chip
                        label={locale === "hi" ? "सबसे लोकप्रिय" : "Most Popular"}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          bgcolor: color,
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.7rem",
                        }}
                      />
                    </>
                  )}
                  <CardContent sx={{ flex: 1, p: 3, pt: featured ? 4 : 3 }}>
                    <Stack spacing={2.5}>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", display: "block", mb: 0.5 }}
                        >
                          {tierData.tagline}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: "#ffffff", lineHeight: 1.3 }}
                        >
                          {locale === "hi" ? tierData.nameHi : tierData.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h4" fontWeight={900} sx={{ color, textShadow: `0 0 15px ${color}25` }}>
                          {tierData.price}
                        </Typography>
                        {tierData.period && (
                          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", mt: 0.5, display: "block" }}>
                            {tierData.period}
                          </Typography>
                        )}
                      </Box>
                      <List dense disablePadding>
                        {tierData.benefits.map((benefit, i) => (
                          <ListItem key={i} disablePadding sx={{ py: 0.4 }}>
                            <ListItemIcon sx={{ minWidth: 24 }}>
                              <CheckCircleIcon sx={{ color, fontSize: 16 }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={benefit}
                              primaryTypographyProps={{ variant: "caption", sx: { color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.5, fontSize: "0.78rem" } }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                  </CardContent>
                  <Box sx={{ p: 2.5, pt: 0 }}>
                    <Button
                      component={Link}
                      href={`/${locale}/membership`}
                      fullWidth
                      variant={featured ? "contained" : "outlined"}
                      sx={{
                        bgcolor: featured ? color : "transparent",
                        borderColor: color,
                        color: featured ? "#fff" : color,
                        borderRadius: "30px",
                        "&:hover": {
                          bgcolor: featured ? `${color}dd` : `${color}15`,
                          borderColor: color,
                        },
                      }}
                    >
                      {locale === "hi" ? "अभी जुड़ें" : "Join Now"}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
