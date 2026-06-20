"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import { Terminal, Users, Award, Heart, Globe, Cpu } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ImpactStats() {
  const t = useTranslations("impact");

  // Hover States for Bento Cards
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Widget 1: Count-up & Canvas Sparkline (Volunteers)
  const [volCount, setVolCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    // Count-up
    let current = 0;
    const end = 500;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      current += 5;
      if (current >= end) {
        setVolCount(end);
        clearInterval(timer);
      } else {
        setVolCount(current);
      }
    }, stepTime);

    // Sparkline Animation
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let animId: number;
        let offset = 0;
        const points = [10, 25, 15, 35, 20, 45, 30, 60, 50, 75, 70, 95];
        const draw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          ctx.strokeStyle = "#E07B39";
          ctx.lineWidth = 3;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(224, 123, 57, 0.5)";
          
          ctx.moveTo(0, canvas.height - points[0]);
          for (let i = 1; i < points.length; i++) {
            const x = (i / (points.length - 1)) * canvas.width;
            const y = canvas.height - points[i] + Math.sin(i + offset) * 3;
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          
          // Gradient fill under sparkline
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
          grad.addColorStop(0, "rgba(224, 123, 57, 0.15)");
          grad.addColorStop(1, "rgba(224, 123, 57, 0)");
          ctx.fillStyle = grad;
          ctx.fill();

          offset += 0.05;
          animId = requestAnimationFrame(draw);
        };
        draw();
        return () => {
          clearInterval(timer);
          cancelAnimationFrame(animId);
        };
      }
    }
    return () => clearInterval(timer);
  }, []);

  // Widget 2: Count-up & Radar Dial (Members)
  const [memberCount, setMemberCount] = useState(0);
  useEffect(() => {
    let current = 0;
    const end = 200;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      current += 2;
      if (current >= end) {
        setMemberCount(end);
        clearInterval(timer);
      } else {
        setMemberCount(current);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, []);

  // Widget 3: Live Terminal Code Simulation (Events Held)
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "$ gemini-agent init",
    "> Checking workspace...",
  ]);
  const [terminalActive, setTerminalActive] = useState(false);
  const terminalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!terminalActive) {
      setTerminalLines([
        "$ gemini-agent init",
        "> Workspace active. Hover to deploy statistics...",
      ]);
      return;
    }

    const sequence = [
      "> Loading volunteer logs...",
      "> Found 500+ registered volunteers.",
      "> Resolving donor credentials...",
      "> Active members count: 200+.",
      "> Checking social activity databases...",
      "> Completed 50+ successful events.",
      "> Impact scope: 1000+ lives touched.",
      "> Build status: SUCCESS [100%]"
    ];

    let currentLineIdx = 0;
    const interval = setInterval(() => {
      if (currentLineIdx < sequence.length) {
        setTerminalLines((prev) => [...prev, sequence[currentLineIdx]]);
        currentLineIdx++;
        // Auto-scroll terminal
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [terminalActive]);

  // Widget 4: Count-up (Lives Touched / Beneficiaries)
  const [beneCount, setBeneCount] = useState(0);
  useEffect(() => {
    let current = 0;
    const end = 1000;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      current += 10;
      if (current >= end) {
        setBeneCount(end);
        clearInterval(timer);
      } else {
        setBeneCount(current);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, []);

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
              textShadow: "0 0 15px rgba(255,255,255,0.1)",
            }}
          >
            {t("title")} <Box component="span" sx={{ color: "primary.main" }}>—</Box> <Box component="span" sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>हमारा प्रभाव</Box>
          </Typography>
          <hr className="section-divider" />
        </Box>

        {/* Bento Grid */}
        <Grid container spacing={3.5}>
          {/* Card 1: Volunteers - Dynamic Stats & Sparkline */}
          <Grid item xs={12} md={7}>
            <Box
              onMouseEnter={() => setHoveredCard("vol")}
              onMouseLeave={() => setHoveredCard(null)}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: "24px",
                background: "rgba(15, 23, 42, 0.45)",
                backdropFilter: "blur(12px) saturate(180%)",
                border: hoveredCard === "vol" ? "1px solid rgba(224, 123, 57, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: hoveredCard === "vol" ? "0 12px 32px rgba(224, 123, 57, 0.15)" : "0 8px 32px rgba(0, 0, 0, 0.3)",
                transform: hoveredCard === "vol" ? "translateY(-6px) scale(1.01)" : "none",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 240,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, mb: 1 }}>
                    {t("volunteers")}
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight: 800, color: "#E07B39", textShadow: "0 0 15px rgba(224,123,57,0.3)" }}>
                    {volCount}+
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, borderRadius: "50%", bgcolor: "rgba(224, 123, 57, 0.1)" }}>
                  <Users size={24} color="#E07B39" />
                </Box>
              </Stack>

              {/* Sparkline Canvas */}
              <Box sx={{ mt: 4, height: 90, width: "100%", position: "relative" }}>
                <canvas ref={canvasRef} width={400} height={90} style={{ width: "100%", height: "100%" }} />
              </Box>
            </Box>
          </Grid>

          {/* Card 2: Members - Active Radar Dial */}
          <Grid item xs={12} md={5}>
            <Box
              onMouseEnter={() => setHoveredCard("mem")}
              onMouseLeave={() => setHoveredCard(null)}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: "24px",
                background: "rgba(15, 23, 42, 0.45)",
                backdropFilter: "blur(12px) saturate(180%)",
                border: hoveredCard === "mem" ? "1px solid rgba(82, 183, 136, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: hoveredCard === "mem" ? "0 12px 32px rgba(82, 183, 136, 0.15)" : "0 8px 32px rgba(0, 0, 0, 0.3)",
                transform: hoveredCard === "mem" ? "translateY(-6px) scale(1.01)" : "none",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: 240,
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, mb: 1 }}>
                  {t("members")}
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 800, color: "#52B788", textShadow: "0 0 15px rgba(82,183,136,0.3)" }}>
                  {memberCount}+
                </Typography>
              </Box>

              {/* Animated Radar/Circular Progress */}
              <Box sx={{ position: "relative", width: 120, height: 120 }}>
                <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
                  {/* Background Circle */}
                  <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                  {/* Progress Circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#52B788"
                    strokeWidth="4"
                    strokeDasharray={2 * Math.PI * 48}
                    strokeDashoffset={2 * Math.PI * 48 * (1 - 0.75)}
                    style={{
                      transition: "stroke-dashoffset 2s ease-in-out",
                      animation: hoveredCard === "mem" ? "spinRadar 4s linear infinite" : "none",
                      transformOrigin: "center",
                    }}
                  />
                  {/* Glowing core */}
                  <circle cx="60" cy="60" r="6" fill="#52B788" style={{ filter: "drop-shadow(0 0 8px #52B788)" }} />
                </svg>
                {/* Radar Sweep Effect */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 6,
                    borderRadius: "50%",
                    border: "1px solid rgba(82, 183, 136, 0.25)",
                    background: "conic-gradient(from 0deg, rgba(82, 183, 136, 0.2) 0deg, transparent 180deg)",
                    animation: hoveredCard === "mem" ? "radarSweep 2s linear infinite" : "none",
                  }}
                />
              </Box>

              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes radarSweep {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}} />
            </Box>
          </Grid>

          {/* Card 3: Live Tech Stack Terminal (Events Held) */}
          <Grid item xs={12} md={8}>
            <Box
              onMouseEnter={() => {
                setHoveredCard("term");
                setTerminalActive(true);
              }}
              onMouseLeave={() => {
                setHoveredCard(null);
                setTerminalActive(false);
              }}
              sx={{
                p: 3.5,
                height: "100%",
                borderRadius: "24px",
                background: "rgba(6, 6, 12, 0.65)",
                backdropFilter: "blur(12px) saturate(180%)",
                border: hoveredCard === "term" ? "1px solid rgba(168, 85, 247, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: hoveredCard === "term" ? "0 12px 32px rgba(168, 85, 247, 0.15)" : "0 8px 32px rgba(0, 0, 0, 0.35)",
                transform: hoveredCard === "term" ? "translateY(-6px) scale(1.005)" : "none",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                display: "flex",
                flexDirection: "column",
                minHeight: 280,
              }}
            >
              {/* Terminal Title Bar */}
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, pb: 1, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <Box sx={{ width: 11, height: 11, borderRadius: "50%", bgcolor: "#ef4444" }} />
                <Box sx={{ width: 11, height: 11, borderRadius: "50%", bgcolor: "#f59e0b" }} />
                <Box sx={{ width: 11, height: 11, borderRadius: "50%", bgcolor: "#22c55e" }} />
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexGrow: 1, justifyContent: "center" }}>
                  <Terminal size={14} className="text-purple-400" />
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontWeight: 700 }}>
                    impact-agent.sh
                  </Typography>
                </Stack>
              </Stack>

              {/* Terminal Screen */}
              <Box
                ref={terminalRef}
                sx={{
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                  color: "#cbd5e1",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.8,
                  lineHeight: 1.5,
                  textAlign: "left",
                  p: 1,
                }}
              >
                {terminalLines.map((line, idx) => (
                  <Box key={idx} sx={{ color: line.startsWith("$") ? "#a855f7" : line.includes("SUCCESS") ? "#52B788" : "#cbd5e1" }}>
                    {line}
                  </Box>
                ))}
                {terminalActive && (
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      width: "6px",
                      height: "14px",
                      bgcolor: "#a855f7",
                      animation: "blink 1s step-end infinite",
                    }}
                  />
                )}
              </Box>
            </Box>
          </Grid>

          {/* Card 4: Lives Touched - Massive Glowing Total */}
          <Grid item xs={12} md={4}>
            <Box
              onMouseEnter={() => setHoveredCard("bene")}
              onMouseLeave={() => setHoveredCard(null)}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: "24px",
                background: "rgba(15, 23, 42, 0.45)",
                backdropFilter: "blur(12px) saturate(180%)",
                border: hoveredCard === "bene" ? "1px solid rgba(224, 123, 57, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: hoveredCard === "bene" ? "0 12px 32px rgba(224, 123, 57, 0.15)" : "0 8px 32px rgba(0, 0, 0, 0.3)",
                transform: hoveredCard === "bene" ? "translateY(-6px) scale(1.01)" : "none",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 280,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ zIndex: 1 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, mb: 1 }}>
                    {t("beneficiaries")}
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight: 900, color: "#C9920C", textShadow: "0 0 20px rgba(201, 146, 12, 0.4)" }}>
                    {beneCount}+
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, borderRadius: "50%", bgcolor: "rgba(201, 146, 12, 0.1)" }}>
                  <Heart size={24} color="#C9920C" />
                </Box>
              </Stack>

              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6, zIndex: 1, mt: 3 }}>
                Working tirelessly across education, healthcare, and community support programs to deliver direct aid.
              </Typography>

              {/* Decorative dynamic neon glow sphere */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: "-40px",
                  right: "-40px",
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(201, 146, 12, 0.15) 0%, transparent 70%)",
                  filter: "blur(20px)",
                  pointerEvents: "none",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
