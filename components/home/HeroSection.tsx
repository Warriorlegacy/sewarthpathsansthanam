"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { Heart, Users, HeartHandshake, Sparkles } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  // 3D Card Hover Tilt Effect
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const rx = -(y / (box.height / 2)) * 10;
    const ry = (x / (box.width / 2)) * 10;
    setTilt({ rx, ry });
  };
  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  // Magnetic Button States
  const [m1, setM1] = useState({ x: 0, y: 0 });
  const [m2, setM2] = useState({ x: 0, y: 0 });
  const [m3, setM3] = useState({ x: 0, y: 0 });

  const handleMagnetic = (
    e: React.MouseEvent<HTMLAnchorElement>,
    setM: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setM({ x: x * 0.35, y: y * 0.35 });
  };

  // Typewriter effect for Sanskrit Motto
  const mottoText = t("tagline");
  const [motto, setMotto] = useState("");
  useEffect(() => {
    let index = 0;
    setMotto("");
    const interval = setInterval(() => {
      if (index < mottoText.length) {
        setMotto((prev) => prev + mottoText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [mottoText]);

  // Particles Configuration
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; size: number; drift: number }>>([]);
  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      size: Math.random() * 5 + 2,
      drift: Math.random() * 80 - 40,
    }));
    setParticles(generated);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "92vh", md: "90vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 8, md: 4 },
        overflow: "hidden",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-80vh) translateX(var(--drift)); opacity: 0; }
        }
      `}} />

      {/* Floating Particles Backdrop */}
      {particles.map((p) => (
        <Box
          key={p.id}
          sx={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(224, 123, 57, 0.35)",
            boxShadow: "0 0 10px rgba(224, 123, 57, 0.5)",
            bottom: "-10px",
            left: `${p.left}%`,
            animation: `floatUp 9s infinite linear`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}px`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          sx={{
            maxWidth: 820,
            mx: "auto",
            p: { xs: 4, sm: 6, md: 8 },
            borderRadius: "24px",
            background: "rgba(15, 23, 42, 0.45)",
            backdropFilter: "blur(16px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.45)",
            transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transition: "transform 0.15s ease-out, border 0.3s, box-shadow 0.3s",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 0.15)",
              boxShadow: "0 16px 50px 0 rgba(168, 85, 247, 0.15)",
            },
          }}
        >
          {/* Registration badge */}
          <Chip
            icon={<Sparkles size={14} className="text-orange-500" />}
            label={t("regText")}
            size="small"
            sx={{
              mb: 4,
              bgcolor: "rgba(224, 123, 57, 0.1)",
              color: "#F5A673",
              border: "1px solid rgba(224, 123, 57, 0.2)",
              fontSize: { xs: "0.7rem", sm: "0.75rem" },
              height: "auto",
              py: 0.6,
              px: 1.5,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              "& .MuiChip-label": { whiteSpace: "normal", lineHeight: 1.4 },
            }}
          />

          {/* Hindi Name */}
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontWeight: 800,
              color: "#E07B39",
              mb: 1.5,
              fontSize: { xs: "2.2rem", sm: "3.2rem", md: "3.8rem" },
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              textShadow: "0 0 20px rgba(224, 123, 57, 0.35)",
            }}
          >
            {t("ngoNameHi")}
          </Typography>

          {/* English Subtitle */}
          <Typography
            variant="h4"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              mb: 4,
              fontWeight: 500,
              fontSize: { xs: "1.1rem", md: "1.4rem" },
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {t("ngoNameEn")}
          </Typography>

          {/* Slogan with Typewriter Effect */}
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              borderLeft: "4px solid #C9920C",
              pl: 3,
              mb: 4,
              textAlign: "left",
            }}
          >
            <Typography
              variant="h3"
              translate="no"
              className="notranslate"
              sx={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontWeight: 800,
                color: "#C9920C",
                fontSize: { xs: "1.6rem", sm: "2.2rem", md: "2.6rem" },
                lineHeight: 1.2,
                minHeight: "1.2em", // Avoid layout shift during typing
                textShadow: "0 0 15px rgba(201, 146, 12, 0.3)",
              }}
            >
              {motto}
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "2px",
                  height: "0.8em",
                  bgcolor: "#C9920C",
                  ml: 0.5,
                  animation: "blink 1s step-end infinite",
                  "@keyframes blink": {
                    "50%": { opacity: 0 },
                  },
                }}
              />
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "rgba(255,255,255,0.55)",
                mt: 0.5,
                fontWeight: 500,
                fontStyle: "italic",
                letterSpacing: "0.02em",
              }}
            >
              {t("taglineEn")}
            </Typography>
          </Box>

          {/* Mission Description */}
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.75)",
              mb: 5,
              maxWidth: 680,
              lineHeight: 1.8,
              fontSize: { xs: "1rem", md: "1.1rem" },
              fontWeight: 400,
            }}
          >
            {t("subtitle")}
          </Typography>

          {/* Magnetic CTA Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ gap: 2 }}
          >
            <Button
              component={Link}
              href={`/${locale}/donate`}
              onMouseMove={(e) => handleMagnetic(e, setM1)}
              onMouseLeave={() => setM1({ x: 0, y: 0 })}
              variant="contained"
              size="large"
              startIcon={<Heart size={18} />}
              className="light-streak"
              sx={{
                fontSize: { xs: "0.95rem", md: "1rem" },
                py: 1.8,
                px: 4,
                minHeight: 54,
                background: "linear-gradient(135deg, #E07B39 0%, #a855f7 100%)",
                boxShadow: "0 8px 30px rgba(168, 85, 247, 0.4)",
                transform: `translate(${m1.x}px, ${m1.y}px)`,
                transition: "transform 0.15s ease-out, box-shadow 0.3s",
                "&:hover": {
                  background: "linear-gradient(135deg, #a855f7 0%, #E07B39 100%)",
                  boxShadow: "0 12px 35px rgba(168, 85, 247, 0.6)",
                },
              }}
            >
              {t("ctaDonate")}
            </Button>

            <Button
              component={Link}
              href={`/${locale}/volunteer`}
              onMouseMove={(e) => handleMagnetic(e, setM2)}
              onMouseLeave={() => setM2({ x: 0, y: 0 })}
              variant="outlined"
              size="large"
              startIcon={<Users size={18} />}
              sx={{
                fontSize: { xs: "0.95rem", md: "1rem" },
                py: 1.8,
                px: 4,
                minHeight: 54,
                borderColor: "rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                transform: `translate(${m2.x}px, ${m2.y}px)`,
                transition: "transform 0.15s ease-out, border 0.3s, background 0.3s",
                backdropFilter: "blur(4px)",
                background: "rgba(255,255,255,0.03)",
                "&:hover": {
                  borderColor: "#E07B39",
                  background: "rgba(224, 123, 57, 0.1)",
                  boxShadow: "0 0 20px rgba(224, 123, 57, 0.25)",
                },
              }}
            >
              {t("ctaVolunteer")}
            </Button>

            <Button
              component={Link}
              href={`/${locale}/membership`}
              onMouseMove={(e) => handleMagnetic(e, setM3)}
              onMouseLeave={() => setM3({ x: 0, y: 0 })}
              variant="outlined"
              size="large"
              startIcon={<HeartHandshake size={18} />}
              sx={{
                fontSize: { xs: "0.95rem", md: "1rem" },
                py: 1.8,
                px: 4,
                minHeight: 54,
                borderColor: "rgba(82, 183, 136, 0.25)",
                color: "#52B788",
                transform: `translate(${m3.x}px, ${m3.y}px)`,
                transition: "transform 0.15s ease-out, border 0.3s, background 0.3s",
                backdropFilter: "blur(4px)",
                background: "rgba(82,183,136,0.02)",
                "&:hover": {
                  borderColor: "#52B788",
                  background: "rgba(82, 183, 136, 0.08)",
                  boxShadow: "0 0 20px rgba(82, 183, 136, 0.25)",
                },
              }}
            >
              {t("ctaMember")}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
