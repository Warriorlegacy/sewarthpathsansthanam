"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { createClient } from "@/lib/supabase/client"
import {
  Box,
  Button,
  TextField,
  Link,
  Stack,
  Typography,
  Alert,
  Container,
  Paper,
  Grid,
} from "@mui/material"
export default function SignupPage() {
  const t = useTranslations("Signup")
  const router = useRouter()
  const supabase = createClient()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError(t("errors.passwordMismatch"))
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError(t("errors.passwordLength"))
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone: phone,
          },
        },
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
      }
    } catch {
      setError(t("errors.unexpected"))
    } finally {
      setLoading(false)
    }
  }

  if (success) {
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
            <Stack spacing={3} alignItems="center">
              <Typography
                variant="h4"
                sx={{ color: "#E07B39", fontWeight: "bold" }}
              >
                Sewarth Path Sansthanam
              </Typography>
              <Alert severity="success" sx={{ width: "100%" }}>
                {t("checkEmail")}
              </Alert>
              <Button
                variant="contained"
                onClick={() => router.push("/login")}
                sx={{
                  backgroundColor: "#E07B39",
                  "&:hover": { backgroundColor: "#c96a32" },
                }}
              >
                {t("backToLogin")}
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    )
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

            <form onSubmit={handleSignup}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label={t("name")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  variant="outlined"
                />

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
                  label={t("phone")}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label={t("password")}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label={t("confirmPassword")}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  variant="outlined"
                />

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
                  {loading ? t("signingUp") : t("signUp")}
                </Button>
              </Stack>
            </form>

            <Typography variant="body2" align="center" color="text.secondary">
              {t("hasAccount")}{" "}
              <Link
                href="/login"
                sx={{ color: "#2D6A4F", cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault()
                  router.push("/login")
                }}
              >
                {t("loginHere")}
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
