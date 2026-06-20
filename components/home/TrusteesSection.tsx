"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import { useLocale } from "next-intl";

interface TrusteeLink {
  url: string;
  text: string;
  textHi: string;
}

interface Trustee {
  name: string;
  nameHi: string;
  designation: string;
  designationHi: string;
  location: string;
  initials: string;
  primary?: boolean;
  link?: string;
  linkText?: string;
  linkTextHi?: string;
  links?: TrusteeLink[];
  image?: string;
}

const trustees: Trustee[] = [
  {
    name: "Shri Mahesh Kumar Pandey",
    nameHi: "श्री महेश कुमार पाण्डेय",
    designation: "Founder & Chief Trustee",
    designationHi: "संस्थापक एवं प्रमुख न्यासी",
    location: "Varanasi, UP",
    initials: "MKP",
    primary: true,
  },
  {
    name: "Piyush Raj Singh",
    nameHi: "पियूष राज सिंह",
    designation: "Technical Head",
    designationHi: "तकनीकी प्रमुख",
    location: "Varanasi, UP",
    initials: "PRS",
    links: [
      {
        url: "https://signhify.lovable.app",
        text: "Founder of Signhify Studio",
        textHi: "सिग्निफाई स्टूडियो के संस्थापक",
      },
      {
        url: "https://signhify-ai-web.vercel.app/",
        text: "Founder of Signhify AI",
        textHi: "सिग्निफाई एआई के संस्थापक",
      }
    ],
    image: "/images/piyush-profile.jpg",
  },
  {
    name: "Smt. Madhu Pandey",
    nameHi: "श्रीमती मधु पाण्डेय",
    designation: "Trustee Member",
    designationHi: "न्यासी सदस्य",
    location: "Varanasi, UP",
    initials: "MP",
  },
  {
    name: "Smt. Komal Devi",
    nameHi: "श्रीमती कोमल देवी",
    designation: "Trustee Member",
    designationHi: "न्यासी सदस्य",
    location: "Varanasi, UP",
    initials: "KD",
  },
  {
    name: "Shri Amarnath Pandey",
    nameHi: "श्री अमरनाथ पाण्डेय",
    designation: "Trustee Member",
    designationHi: "न्यासी सदस्य",
    location: "Varanasi, UP",
    initials: "AP",
  },
  {
    name: "Km. Priti Kumari",
    nameHi: "कु. प्रीति कुमारी",
    designation: "Trustee Member",
    designationHi: "न्यासी सदस्य",
    location: "Varanasi, UP",
    initials: "PK",
  },
];

export default function TrusteesSection() {
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
            {locale === "hi" ? "हमारा नेतृत्व" : "Our Leadership"}
          </Typography>
          <hr className="section-divider" style={{ margin: "12px auto 16px" }} />
          <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.7)" }}>
            {locale === "hi"
              ? "न्यास की स्थापना और संचालन करने वाले समर्पित न्यासी"
              : "Dedicated trustees who founded and guide the trust"}
          </Typography>
        </Box>

        {/* Leadership Grid */}
        <Grid container spacing={3.5} justifyContent="center">
          {trustees.map((trustee) => (
            <Grid item xs={12} sm={6} md={4} key={trustee.name}>
              <Card
                sx={{
                  height: "100%",
                  textAlign: "center",
                  border: trustee.primary ? "2px solid #E07B39" : "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(15, 23, 42, 0.45) !important",
                  backdropFilter: "blur(12px) saturate(180%)",
                  borderRadius: "20px",
                  position: "relative",
                  boxShadow: trustee.primary ? "0 0 25px rgba(224, 123, 57, 0.2)" : "0 8px 32px rgba(0, 0, 0, 0.3)",
                  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: trustee.primary ? "#E07B39" : "rgba(255, 255, 255, 0.2)",
                    boxShadow: trustee.primary ? "0 12px 35px rgba(224, 123, 57, 0.35)" : "0 12px 35px rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                {trustee.primary && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: "linear-gradient(90deg, #E07B39, #C9920C)",
                    }}
                  />
                )}
                <CardContent sx={{ p: 4, pt: trustee.primary ? 4.5 : 4 }}>
                  <Stack alignItems="center" spacing={2}>
                    <Avatar
                      src={trustee.image}
                      sx={{
                        width: trustee.primary ? 80 : 68,
                        height: trustee.primary ? 80 : 68,
                        bgcolor: trustee.primary ? "#E07B39" : "#2D6A4F",
                        fontSize: trustee.primary ? "1.6rem" : "1.3rem",
                        fontWeight: 700,
                        border: `2px solid rgba(255, 255, 255, 0.1)`,
                        boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
                      }}
                    >
                      {!trustee.image && trustee.initials}
                    </Avatar>
                    <Box>
                      <Typography
                        variant={trustee.primary ? "h6" : "subtitle1"}
                        fontWeight={700}
                        sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: "#ffffff", lineHeight: 1.3 }}
                      >
                        {locale === "hi" ? trustee.nameHi : trustee.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "primary.main", fontWeight: 700, display: "block", mt: 0.8, textTransform: "uppercase", letterSpacing: "0.05em" }}
                      >
                        {locale === "hi" ? trustee.designationHi : trustee.designation}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", display: "block", mt: 0.5 }}>
                        {trustee.location}
                      </Typography>
                      
                      {/* Interactive links */}
                      {trustee.link && (
                        <Typography
                          component="a"
                          href={trustee.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="caption"
                          sx={{
                            color: "#52B788",
                            textDecoration: "none",
                            display: "block",
                            mt: 1.5,
                            fontWeight: 600,
                            transition: "color 0.2s",
                            "&:hover": {
                              color: "primary.main",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {locale === "hi" ? trustee.linkTextHi : trustee.linkText}
                        </Typography>
                      )}
                      {trustee.links && trustee.links.map((lnk, idx) => (
                        <Typography
                          key={idx}
                          component="a"
                          href={lnk.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="caption"
                          sx={{
                            color: "#52B788",
                            textDecoration: "none",
                            display: "block",
                            mt: 1,
                            fontWeight: 600,
                            transition: "color 0.2s",
                            "&:hover": {
                              color: "primary.main",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {locale === "hi" ? lnk.textHi : lnk.text}
                        </Typography>
                      ))}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
