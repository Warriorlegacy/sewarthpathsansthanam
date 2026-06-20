"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import {
  GraduationCap,
  Activity,
  Sparkles,
  Leaf,
  BookOpen,
  Handshake,
} from "lucide-react";
import { useTranslations } from "next-intl";

const programs = [
  { key: "education", icon: GraduationCap, color: "#E07B39" },
  { key: "health", icon: Activity, color: "#52B788" },
  { key: "women", icon: Sparkles, color: "#a855f7" },
  { key: "environment", icon: Leaf, color: "#10b981" },
  { key: "culture", icon: BookOpen, color: "#C9920C" },
  { key: "social", icon: Handshake, color: "#ec4899" },
];

export default function ProgramsSection() {
  const t = useTranslations("programs");

  // Tab Morphing State
  const [activeTab, setActiveTab] = useState(0);
  const [blastParticles, setBlastParticles] = useState<Array<{ id: number; angle: number; distance: number }>>([]);
  const [fade, setFade] = useState(false);

  const changeTab = (index: number) => {
    if (index === activeTab) return;
    setFade(true);
    setTimeout(() => {
      setActiveTab(index);
      setFade(false);
    }, 150);

    // Trigger particle blast
    const newParticles = Array.from({ length: 18 }).map((_, i) => ({
      id: Date.now() + i,
      angle: Math.random() * 2 * Math.PI,
      distance: Math.random() * 120 + 60,
    }));
    setBlastParticles(newParticles);
    setTimeout(() => {
      setBlastParticles([]);
    }, 600);
  };

  // Stacking Scroll-driven Card Visibility
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({});
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => ({ ...prev, [index]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const ActiveIcon = programs[activeTab].icon;

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
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255,255,255,0.7)",
              maxWidth: 550,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            {t("subtitle")}
          </Typography>
        </Box>

        {/* Tabbed Feature Card Console */}
        <Box sx={{ mb: 10 }}>
          {/* Tabs Navigation */}
          <Grid container spacing={1.5} justifyContent="center" sx={{ mb: 4 }}>
            {programs.map(({ key, icon: Icon, color }, idx) => (
              <Grid item xs={6} sm={4} md={2} key={key}>
                <Button
                  fullWidth
                  onClick={() => changeTab(idx)}
                  sx={{
                    py: 1.8,
                    borderRadius: "16px",
                    background: activeTab === idx ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.35)",
                    border: activeTab === idx ? `1px solid ${color}` : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: activeTab === idx ? `0 0 20px ${color}25` : "none",
                    color: activeTab === idx ? color : "rgba(255,255,255,0.65)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.05)",
                      borderColor: color,
                      color: color,
                    },
                  }}
                >
                  <Icon size={20} />
                  <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.02em" }}>
                    {t(`${key}.title`)}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>

          {/* Morphing Details Panel */}
          <Box
            sx={{
              position: "relative",
              p: { xs: 4, md: 6 },
              borderRadius: "24px",
              background: "rgba(15, 23, 42, 0.45)",
              backdropFilter: "blur(12px) saturate(180%)",
              border: `1px solid ${programs[activeTab].color}25`,
              boxShadow: `0 12px 40px rgba(0, 0, 0, 0.45), 0 0 30px ${programs[activeTab].color}10`,
              minHeight: 220,
              overflow: "hidden",
            }}
          >
            {/* Particle Blast Canvas inside details card */}
            {blastParticles.map((p) => {
              const x = Math.cos(p.angle) * p.distance;
              const y = Math.sin(p.angle) * p.distance;
              return (
                <Box
                  key={p.id}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: programs[activeTab].color,
                    boxShadow: `0 0 10px ${programs[activeTab].color}`,
                    transform: "translate(-50%, -50%)",
                    animation: "blastOut 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
                    pointerEvents: "none",
                    zIndex: 2,
                    "@keyframes blastOut": {
                      "0%": { transform: "translate(-50%, -50%) scale(1.5)", opacity: 1 },
                      "100%": { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.1)`, opacity: 0 },
                    }
                  }}
                />
              );
            })}

            <Grid container spacing={4} alignItems="center" sx={{ opacity: fade ? 0 : 1, transition: "opacity 0.15s ease" }}>
              <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "20px",
                    bgcolor: `${programs[activeTab].color}15`,
                    border: `1px solid ${programs[activeTab].color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 20px ${programs[activeTab].color}20`,
                  }}
                >
                  <ActiveIcon size={38} color={programs[activeTab].color} />
                </Box>
              </Grid>
              <Grid item xs={12} md={10}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5, color: "#ffffff" }}>
                  {t(`${programs[activeTab].key}.title`)}
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, fontSize: "1.05rem" }}>
                  {t(`${programs[activeTab].key}.desc`)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Stacking Scroll-driven Card List */}
        <Stack spacing={4}>
          {programs.map(({ key, icon: Icon, color }, idx) => {
            const isVisible = visibleCards[idx];
            const isEven = idx % 2 === 0;
            return (
              <Box
                key={key}
                data-index={idx}
                ref={(el: any) => { cardRefs.current[idx] = el; }}
                sx={{
                  position: "sticky",
                  top: 100 + idx * 20,
                  transform: isVisible 
                    ? "translateY(0) scale(1)" 
                    : `translateY(100px) translateX(${isEven ? "-80px" : "80px"}) scale(0.9)`,
                  opacity: isVisible ? 1 : 0,
                  transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                  zIndex: idx + 1,
                  mb: idx === programs.length - 1 ? 0 : 4,
                }}
              >
                <Card
                  sx={{
                    p: { xs: 3, md: 4 },
                    background: "rgba(15, 23, 42, 0.55) !important",
                    backdropFilter: "blur(16px)",
                    border: `1px solid rgba(255,255,255,0.08)`,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.45)",
                    transition: "border 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      borderColor: color,
                      boxShadow: `0 12px 35px ${color}20`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={12} sm={3} md={2}>
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: "16px",
                            bgcolor: `${color}15`,
                            border: `1px solid ${color}35`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon size={30} color={color} />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={9} md={10}>
                        <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5, color: "#ffffff" }}>
                          {t(`${key}.title`)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                          {t(`${key}.desc`)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
