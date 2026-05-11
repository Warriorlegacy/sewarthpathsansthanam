"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { createClient } from "@/lib/supabase/client"
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  Alert,
  Container,
  Paper,
  Grid,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

export default function LoginPage() {
  const t = useTranslations("Login")
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [magicLinkLoading, setMagicLinkLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        // Check if user is admin and redirect accordingly
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", (await supabase.auth.getUser()).data.user?.id).maybeSingle();
        router.push(profile?.role === "admin" ? "/admin" : "/dashboard")
        router.refresh()
      }
    } catch {
      setError(t("errors.unexpected"))
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = async () => {
    setMagicLinkLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(t("magicLinkSent"))
      }
    } catch {
      setError(t("errors.unexpected"))
    } finally {
      setMagicLinkLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FFFBF5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <Stack spacing={4}>
            <Stack alignItems="center" spacing={2}>
              <Typography
                variant="h4"
                sx={{ color: "#E07B39", fontWeight: "bold" }}
              >
                Sewarth Path Sansthanam
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {t("title")}
              </Typography>
            </Stack>

            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" onClose={() => setSuccess(null)}>
                {success}
              </Alert>
            )}

            <form onSubmit={handleEmailLogin}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label={t("email")}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label={t("password")}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        sx={{ color: "#E07B39" }}
                      />
                    }
                    label={t("rememberMe")}
                  />
                </Stack>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    backgroundColor: "#E07B39",
                    "&:hover": { backgroundColor: "#c96a32" },
                    py: 1.5,
                  }}
                >
                  {loading ? t("signingIn") : t("signIn")}
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  disabled={magicLinkLoading || !email}
                  onClick={handleMagicLink}
                  sx={{
                    color: "#2D6A4F",
                    borderColor: "#2D6A4F",
                    "&:hover": {
                      borderColor: "#2D6A4F",
                      backgroundColor: "rgba(45, 106, 79, 0.04)",
                    },
                    py: 1.5,
                  }}
                >
                  {magicLinkLoading ? t("sending") : t("sendMagicLink")}
                </Button>
              </Stack>
            </form>

            <Typography variant="body2" align="center" color="text.secondary">
              {t("noAccount")}{" "}
              <Link href="#" sx={{ color: "#2D6A4F" }}>
                {t("contactAdmin")}
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
