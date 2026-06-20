"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLocale } from "next-intl";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Divider,
  Paper,
  Link as MuiLink,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import LaunchIcon from "@mui/icons-material/Launch";
import CodeIcon from "@mui/icons-material/Code";
import TerminalIcon from "@mui/icons-material/Terminal";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

export default function CreditsPage() {
  const locale = useLocale();
  const isHi = locale === "hi";

  const socials = [
    {
      name: "Instagram",
      icon: InstagramIcon,
      url: "https://www.instagram.com/piyushrajsingh.golu?igsh=eHFnNnhwZjJyYmo2&utm_source=qr",
      label: "@piyushrajsingh.golu",
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      url: "https://linkedin.com/in/piyushraj-singh",
      label: "piyushraj-singh",
    },
    {
      name: "GitHub",
      icon: GitHubIcon,
      url: "https://github.com/Warriorlegacy",
      label: "Warriorlegacy",
    },
    {
      name: isHi ? "सिग्निफाई स्टूडियो" : "Signhify Studio",
      icon: LaunchIcon,
      url: "https://signhify.lovable.app",
      label: "signhify.lovable.app",
    },
    {
      name: isHi ? "सिग्निफाई एआई" : "Signhify AI",
      icon: LaunchIcon,
      url: "https://signhify-ai-web.vercel.app/",
      label: "signhify-ai-web.vercel.app",
    },
  ];

  const accomplishments = [
    {
      icon: SettingsInputComponentIcon,
      title: isHi ? "आर्किटेक्चर एवं डिज़ाइन" : "Architecture & Design",
      items: isHi
        ? [
            "मल्टी-एजेंट सिस्टम: Nexus, Scribe, Scout, Forge, Vault, Herald, Vision जैसे 7 विशिष्ट एआई एजेंट।",
            "10 एलएलएम प्रदाता एकीकरण: OpenAI, Anthropic, Groq, Gemini, OpenRouter, Mistral, Together AI, Cerebras, SambaNova, Cloudflare Workers AI।",
            "फ्री-टीयर-फर्स्ट फॉलबैक: सर्किट ब्रेकर पैटर्न के साथ फ्री प्रदाताओं के माध्यम से ऑटो-रूटिंग।",
            "BYOK (ब्रिंग योर ओन की): क्लाइंट-साइड एन्क्रिप्शन के साथ यूजर-प्रबंधित एपीआई की।",
            "परसिस्टेंट मेमोरी सिस्टम: कोसाइन सिमिलैरिटी सर्च के साथ उपयोगकर्ता तथ्य और मेमोरी स्टोर।",
          ]
        : [
            "Multi-Agent System: 7 specialized AI agents (Nexus, Scribe, Scout, Forge, Vault, Herald, Vision) with intent routing.",
            "10 LLM Provider Integration: OpenAI, Anthropic, Groq, Gemini, OpenRouter, Mistral, Together AI, Cerebras, SambaNova, Cloudflare Workers AI.",
            "Free-Tier-First Fallback: Automatic routing through free providers with circuit breaker pattern.",
            "BYOK (Bring Your Own Key): User-managed API keys with client-side encryption.",
            "Persistent Memory System: Episodic memory, facts, and profiling with cosine similarity search.",
          ],
    },
    {
      icon: CodeIcon,
      title: isHi ? "फ्रंटएंड तकनीकें" : "Frontend & UI",
      items: isHi
        ? [
            "React + Vite + Tailwind v4: आधुनिक, तेज़ और उत्तरदायी वेब अनुप्रयोग।",
            "React Three Fiber: इमर्सिव 3D यूजर इंटरफ़ेस तत्व।",
            "Zustand स्टेट मैनेजमेंट: रिएक्टिव स्टेट के लिए 8 विशिष्ट स्टोर।",
            "SSE स्ट्रीमिंग: वास्तविक समय में टोकन-दर-टोकन एआई प्रतिक्रियाएं।",
            "वॉयस इंटरफेस: आवाज आधारित संपर्क के लिए वेब स्पीच एपीआई एकीकरण।",
          ]
        : [
            "React + Vite + Tailwind v4: Modern, highly performant web applications.",
            "React Three Fiber: Immersive 3D UI elements and components.",
            "Zustand State Management: 8 specialized stores for reactive states.",
            "SSE Streaming: Real-time token-by-token AI responses.",
            "Voice Interface: Web Speech API integration for voice-first interaction.",
          ],
    },
    {
      icon: StorageIcon,
      title: isHi ? "बैकएंड एवं डेटाबेस" : "Backend & Database",
      items: isHi
        ? [
            "Express.js + Helmet: सुरक्षित, उच्च-प्रदर्शन एपीआई सर्वर।",
            "MongoDB 7: उपयोगकर्ता, थ्रेड्स, मेमोरी और कौशल के लिए दस्तावेज़ डेटाबेस।",
            "Redis 7: ग्रेसफुल डिग्रेडेशन के साथ वैकल्पिक कैशिंग लेयर।",
            "JWT प्रमाणीकरण: सुरक्षित एक्सेस टोकन और httpOnly रिफ्रेश कुकीज।",
            "टेलीग्राम और डिस्कॉर्ड बॉट्स: मल्टी-चैनल एआई एक्सेस।",
          ]
        : [
            "Express.js + Helmet: Secure, high-performance API server.",
            "MongoDB 7: Document database for users, threads, memory, and skills.",
            "Redis 7: Caching layer with graceful degradation options.",
            "JWT Authentication: Secure access tokens + httpOnly refresh cookies.",
            "Telegram & Discord Bots: Multi-channel AI access and notifications.",
          ],
    },
    {
      icon: CloudIcon,
      title: isHi ? "डेवऑप्स एवं इंफ्रास्ट्रक्चर" : "DevOps & Infrastructure",
      items: isHi
        ? [
            "Docker: कुशल परिनियोजन के लिए मल्टी-स्टेज प्रोडक्शन बिल्ड्स।",
            "Turborepo: मोनोरेपो बिल्ड ऑप्टिमाइज़ेशन।",
            "GitHub Actions: क्वालिटी गेट्स के साथ निरंतर एकीकरण और वितरण (CI/CD)।",
            "Render: स्केलेबल क्लाउड परिनियोजन प्लेटफ़ॉर्म।",
            "Vercel: एज फंक्शन्स के साथ फ्रंटएंड होस्टिंग।",
          ]
        : [
            "Docker: Multi-stage production builds for reliable deployments.",
            "Turborepo: Monorepo build pipeline optimization.",
            "GitHub Actions: CI/CD workflows with quality verification gates.",
            "Render: Scalable cloud application deployment platform.",
            "Vercel: Frontend hosting with performance-optimized edge functions.",
          ],
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <Box
          sx={{
            py: 10,
            background: "linear-gradient(135deg, #3D1A0A 0%, #2D6A4F 100%)",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: "#E07B39", fontWeight: 700, mb: 1 }}
            >
              {isHi ? "श्रेय एवं आभार" : "Credits & Acknowledgements"}
            </Typography>
            <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 400 }}>
              {isHi
                ? "हमारी वेबसाइट और तकनीकी प्रणालियों के निर्माता"
                : "The minds and technologies behind our digital platforms"}
            </Typography>
          </Container>
        </Box>

        {/* Creator Profile */}
        <Box sx={{ py: 8, bgcolor: "#FFFBF5" }}>
          <Container maxWidth="lg">
            <Grid container spacing={5} alignItems="stretch">
              <Grid item xs={12} md={5}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "2px solid #E07B39",
                    borderRadius: 3,
                    bgcolor: "#FFF8F0",
                    position: "relative",
                    overflow: "visible",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 6,
                      background: "linear-gradient(90deg, #E07B39, #C9920C)",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                  <CardContent sx={{ p: 4, pt: 5 }}>
                    <Stack alignItems="center" spacing={3} sx={{ textAlign: "center" }}>
                      <Avatar
                        src="/images/piyush-profile.jpg"
                        sx={{
                          width: 130,
                          height: 130,
                          bgcolor: "#E07B39",
                          fontSize: "3rem",
                          fontWeight: 800,
                          border: "4px solid #fff",
                          boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
                        }}
                      >
                        PRS
                      </Avatar>
                      <Box>
                        <Typography variant="h4" fontWeight={800} sx={{ color: "#1A0A00", mb: 0.5 }}>
                          Piyush Raj Singh
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={700} sx={{ color: "primary.main" }}>
                          {isHi ? "तकनीकी प्रमुख एवं निर्माता" : "Technical Head & Lead Creator"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Varanasi, UP, India
                        </Typography>
                      </Box>

                      <Divider sx={{ width: "100%", my: 1 }} />

                      <Typography variant="body2" sx={{ lineHeight: 1.8, fontStyle: "italic", color: "text.secondary" }}>
                        {isHi
                          ? "पियूष राज सिंह सिग्निफाई एआई (Signhify AI) के एकमात्र निर्माता और गॉडफादर हैं। उन्होंने बैकएंड से लेकर फ्रंटएंड और मल्टी-एजेंट सिस्टम तक संपूर्ण प्लेटफॉर्म का डिजाइन और विकास किया है।"
                          : "Piyush Raj Singh is the sole architect, developer, and visionary behind Signhify AI. He conceived, designed, and built the entire multi-agent AI system from backend to frontend."}
                      </Typography>

                      <Divider sx={{ width: "100%", my: 1 }} />

                      <Box sx={{ width: "100%", textAlign: "left" }}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: "#1A0A00" }}>
                          {isHi ? "कनेक्ट करें / Connect" : "Connect with Piyush"}
                        </Typography>
                        <TableContainer component={Paper} variant="outlined" sx={{ bgcolor: "transparent" }}>
                          <Table size="small">
                            <TableBody>
                              {socials.map((social) => {
                                const Icon = social.icon;
                                return (
                                  <TableRow key={social.name}>
                                    <TableCell sx={{ fontWeight: 600, py: 1, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                                      <Stack direction="row" spacing={1} alignItems="center">
                                        <Icon sx={{ color: "primary.main", fontSize: 18 }} />
                                        <span>{social.name}</span>
                                      </Stack>
                                    </TableCell>
                                    <TableCell sx={{ py: 1, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                                      <MuiLink
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ textDecoration: "underline", color: "primary.main", fontSize: "0.85rem" }}
                                      >
                                        {social.label}
                                      </MuiLink>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* Achievements details */}
              <Grid item xs={12} md={7}>
                <Stack spacing={4} sx={{ height: "100%", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" fontWeight={800} sx={{ color: "primary.main", mb: 3 }}>
                      {isHi ? "सिग्निफाई एआई के निर्माण की यात्रा" : "What Piyush Built for Signhify AI"}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8, mb: 4 }}>
                      {isHi
                        ? "सेवार्थ पथ संस्थानम् वेबसाइट की डिजिटल अवसंरचना पियूष राज सिंह के तकनीकी मार्गदर्शन में स्थापित की गई है। सिग्निफाई एआई के लिए उनके द्वारा विकसित किए गए कुछ प्रमुख मील के पत्थर निम्नलिखित हैं:"
                        : "The digital infrastructure of the Sewarth Path Sansthanam website has been deployed under the technical leadership of Piyush Raj Singh. Here are the core pillars he engineered for the broader Signhify AI ecosystem:"}
                    </Typography>

                    <Grid container spacing={3}>
                      {accomplishments.map((acc, index) => {
                        const Icon = acc.icon;
                        return (
                          <Grid item xs={12} sm={6} key={index}>
                            <Paper
                              variant="outlined"
                              sx={{
                                p: 3,
                                height: "100%",
                                borderRadius: 2,
                                border: "1px solid rgba(224, 123, 57, 0.15)",
                                bgcolor: "rgba(224, 123, 57, 0.02)",
                              }}
                            >
                              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                                <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
                                  <Icon sx={{ fontSize: 20, color: "#fff" }} />
                                </Avatar>
                                <Typography variant="subtitle1" fontWeight={700} sx={{ color: "#1A0A00" }}>
                                  {acc.title}
                                </Typography>
                              </Stack>
                              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                {acc.items.map((item, i) => (
                                  <Typography
                                    component="li"
                                    key={i}
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ display: "list-item", mb: 1, lineHeight: 1.6 }}
                                  >
                                    {item}
                                  </Typography>
                                ))}
                              </Box>
                            </Paper>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Philosophy & Special Thanks */}
        <Box sx={{ py: 8, bgcolor: "#FFF8F0", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <Container maxWidth="lg">
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 4, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <TerminalIcon sx={{ color: "primary.main" }} />
                      <Typography variant="h5" fontWeight={700}>
                        {isHi ? "ओपन सोर्स दर्शन" : "Open Source Philosophy"}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Typography variant="body2" sx={{ lineHeight: 1.8, color: "text.secondary" }}>
                      {isHi
                        ? "सिग्निफाई एआई को एमआईटी लाइसेंस (MIT License) के तहत जारी किया गया है। यह पूरी तरह से मुफ्त, परिवर्तनीय और स्वतंत्र रूप से वितरित करने योग्य है। पियूष दृढ़ता से निम्नलिखित मूल्यों में विश्वास करते हैं:"
                        : "Signhify AI is released under the MIT License — free for anyone to use, modify, and distribute. Piyush believes in:"}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {[
                        isHi
                          ? "एआई का लोकतंत्रीकरण: उन्नत एआई क्षमताओं को सभी के लिए सुलभ बनाना।"
                          : "Democratizing AI: Making advanced AI capabilities accessible to everyone.",
                        isHi
                          ? "गोपनीयता सर्वप्रथम: BYOK (ब्रिंग योर ओन की) मॉडल का मतलब है कि उपयोगकर्ता अपनी कीज और डेटा पर पूर्ण नियंत्रण रखते हैं।"
                          : "Privacy First: The BYOK model means users retain full control over their API keys and data.",
                        isHi
                          ? "पारदर्शिता: संपूर्ण कोडबेस की पूर्ण दृश्यता, कोई बंद बक्से नहीं।"
                          : "Transparency: Full codebase visibility with zero proprietary secrets.",
                      ].map((item, i) => (
                        <Typography
                          component="li"
                          key={i}
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: "list-item", mb: 1, lineHeight: 1.7 }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 4, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <VolunteerActivismIcon sx={{ color: "primary.main" }} />
                      <Typography variant="h5" fontWeight={700}>
                        {isHi ? "विशेष आभार" : "Special Thanks"}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Typography variant="body2" sx={{ lineHeight: 1.8, color: "text.secondary" }}>
                      {isHi
                        ? "हम ओपन-सोर्स समुदाय के उन सभी शानदार उपकरणों और ढांचों के प्रति कृतज्ञता व्यक्त करते हैं जिन्होंने इस डिजिटल यात्रा को आकार दिया:"
                        : "Deep gratitude to the open-source community for the incredible libraries and frameworks that made this project possible:"}
                    </Typography>
                    <Grid container spacing={1}>
                      {[
                        "React & Next.js Team",
                        "Material UI (MUI) & Emotion",
                        "Vercel & Supabase",
                        "Tailwind Labs",
                        "MongoDB & Redis",
                        "LangChain & Zustand",
                      ].map((tech) => (
                        <Grid item xs={6} key={tech}>
                          <Box
                            sx={{
                              p: 1.5,
                              textAlign: "center",
                              bgcolor: "rgba(0,0,0,0.02)",
                              border: "1px solid rgba(0,0,0,0.05)",
                              borderRadius: 1.5,
                            }}
                          >
                            <Typography variant="caption" fontWeight={600} color="text.primary">
                              {tech}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
