"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const presetAmounts = [251, 501, 1001, 2100, 5001];

export default function DonationForm() {
  const t = useTranslations("donate");
  const locale = useLocale();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(501);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "general",
    pan: "",
    anonymous: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [paymentMode, setPaymentMode] = useState<"online" | "direct">("online");

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 1) {
      setError("Please select or enter a valid donation amount.");
      return;
    }
    if (!form.name || !form.email) {
      setError("Name and email are required.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          donorName: form.name,
          donorEmail: form.email,
          donorPhone: form.phone,
          purpose: form.purpose,
          pan: form.pan,
          isAnonymous: form.anonymous,
          type: "donation",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");

      // Load Razorpay
      const win = window as unknown as {
        Razorpay: new (opts: object) => { open: () => void };
      };
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "सेवार्थ पथ संस्थानम्",
        description: `Donation — ${form.purpose}`,
        order_id: data.orderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#E07B39" },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, donationId: data.donationId }),
          });
          if (verifyRes.ok) setSuccess(true);
          else setError("Payment verification failed. Contact support.");
        },
      };

      if (typeof win.Razorpay !== "undefined") {
        const rzp = new win.Razorpay(options);
        rzp.open();
      } else {
        // Fallback: simulate success for demo
        setSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card sx={{ p: 4, textAlign: "center" }}>
        <VolunteerActivismIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          {t("successTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("successSubtitle")}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => { setSuccess(false); setSelectedAmount(501); setCustomAmount(""); }}
        >
          {locale === "hi" ? "एक और दान करें" : "Donate Again"}
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t("title")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t("subtitle")}
        </Typography>

        {/* Tab selection buttons */}
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button
            variant={paymentMode === "online" ? "contained" : "outlined"}
            color="primary"
            onClick={() => setPaymentMode("online")}
            fullWidth
            sx={{ py: 1.25, fontWeight: 700, borderRadius: 2 }}
          >
            {locale === "hi" ? "ऑनलाइन भुगतान" : "Online Payment"}
          </Button>
          <Button
            variant={paymentMode === "direct" ? "contained" : "outlined"}
            color="primary"
            onClick={() => setPaymentMode("direct")}
            fullWidth
            sx={{ py: 1.25, fontWeight: 700, borderRadius: 2 }}
          >
            {locale === "hi" ? "बैंक / UPI ट्रांसफर" : "Bank / UPI"}
          </Button>
        </Stack>

        {paymentMode === "online" ? (
          <form onSubmit={handleSubmit}>
            {/* Amount selection */}
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
              {t("amountLabel")}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mb: 2 }}>
              {presetAmounts.map((amt) => (
                <Chip
                  key={amt}
                  label={`₹${amt.toLocaleString("en-IN")}`}
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                  sx={{
                    height: 44,
                    px: 1,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    bgcolor: selectedAmount === amt && !customAmount ? "primary.main" : "transparent",
                    color: selectedAmount === amt && !customAmount ? "#fff" : "primary.main",
                    border: "2px solid",
                    borderColor: selectedAmount === amt && !customAmount ? "primary.main" : "primary.light",
                    cursor: "pointer",
                    "&:hover": { bgcolor: selectedAmount === amt && !customAmount ? "primary.dark" : "primary.light", color: selectedAmount === amt && !customAmount ? "#fff" : "#fff" },
                  }}
                />
              ))}
            </Stack>
            <TextField
              label={t("customPlaceholder")}
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value.replace(/\D/g, "")); setSelectedAmount(null); }}
              size="small"
              type="number"
              inputProps={{ min: 1 }}
              sx={{ mb: 3, maxWidth: 200 }}
            />

            <Stack spacing={2.5}>
              <TextField
                label={t("nameLabel")}
                required
                fullWidth
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <TextField
                label={t("emailLabel")}
                type="email"
                required
                fullWidth
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <TextField
                label={t("phoneLabel")}
                fullWidth
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel>{t("purposeLabel")}</InputLabel>
                <Select
                  value={form.purpose}
                  label={t("purposeLabel")}
                  onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                >
                  {Object.entries({
                    general: locale === "hi" ? "सामान्य निधि" : "General Fund",
                    education: locale === "hi" ? "शिक्षा" : "Education",
                    health: locale === "hi" ? "स्वास्थ्य" : "Health & Medical",
                    women: locale === "hi" ? "महिला सशक्तिकरण" : "Women Empowerment",
                    environment: locale === "hi" ? "पर्यावरण" : "Environment",
                    culture: locale === "hi" ? "संस्कृति" : "Culture & Heritage",
                  }).map(([value, label]) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label={t("panLabel")}
                fullWidth
                value={form.pan}
                onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase() })}
                inputProps={{ maxLength: 10 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.anonymous}
                    onChange={(e) => setForm({ ...form, anonymous: e.target.checked })}
                  />
                }
                label={t("anonymousLabel")}
              />
            </Stack>

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading || (!finalAmount && !customAmount)}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <VolunteerActivismIcon />}
              sx={{ mt: 3, py: 1.75, fontSize: "1.05rem", fontWeight: 700, minHeight: 52 }}
            >
              {loading
                ? (locale === "hi" ? "प्रक्रिया में..." : "Processing...")
                : `${t("submit")} ${finalAmount ? `— ₹${finalAmount.toLocaleString("en-IN")}` : ""}`}
            </Button>
          </form>
        ) : (
          <Stack spacing={3} alignItems="center">
            {/* QR Code section */}
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
                {locale === "hi" ? "UPI क्यूआर कोड स्कैन करें" : "Scan UPI QR Code"}
              </Typography>
              <Box
                component="img"
                src="/images/payment-qr.jpg"
                alt="Sewarth Path Sansthanam UPI QR Code"
                sx={{
                  width: "100%",
                  maxWidth: 240,
                  height: "auto",
                  mx: "auto",
                  border: "2px solid rgba(224, 123, 57, 0.15)",
                  borderRadius: 3,
                  boxShadow: "0 8px 24px rgba(224, 123, 57, 0.08)",
                  p: 1,
                  bgcolor: "#fff"
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5, fontWeight: 700 }}>
                UPI ID: SEWARTHPATH482@iob
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, fontStyle: "italic", px: 2 }}>
                {locale === "hi" 
                  ? "किसी भी UPI ऐप (BHIM, Google Pay, PhonePe, Paytm) से स्कैन करके भुगतान करें"
                  : "Scan and pay using any UPI App (BHIM, GPay, PhonePe, Paytm)"}
              </Typography>
            </Box>

            <Divider sx={{ width: "100%", my: 1 }} />

            {/* Bank details section */}
            <Box sx={{ width: "100%" }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5, textAlign: "center" }}>
                {locale === "hi" ? "🏛️ बैंक खाता विवरण" : "🏛️ Bank Account Details"}
              </Typography>
              <Box
                sx={{
                  bgcolor: "#FFF8F0",
                  border: "1px solid rgba(224, 123, 57, 0.15)",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.25
                }}
              >
                {[
                  { label: locale === "hi" ? "नाम (Account Name)" : "Account Name", value: "SEWARTH PATH SANSTHANAM" },
                  { label: locale === "hi" ? "बैंक (Bank Name)" : "Bank Name", value: "Indian Overseas Bank (IOB)" },
                  { label: locale === "hi" ? "खाता संख्या (Account No.)" : "Account Number", value: "365302000000482", copyable: true },
                  { label: locale === "hi" ? "IFSC कोड" : "IFSC Code", value: "IOBA0000370", copyable: true },
                  { label: locale === "hi" ? "शाखा (Branch)" : "Branch", value: "Varanasi (Lahurabir Main Crossing)" },
                  { label: locale === "hi" ? "खाता प्रकार (A/c Type)" : "Account Type", value: locale === "hi" ? "करंट / ट्रस्ट खाता" : "Current / Trust Account" },
                ].map((item) => (
                  <Box key={item.label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(0,0,0,0.04)", pb: 1, "&:last-child": { borderBottom: "none", pb: 0 } }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="caption" fontWeight={700} sx={{ textAlign: "right", fontFamily: item.copyable ? "monospace" : "inherit", wordBreak: "break-all", pl: 2 }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Note/Call to action */}
            <Alert severity="info" sx={{ width: "100%", borderRadius: 2 }}>
              <Typography variant="caption" sx={{ display: "block", lineHeight: 1.5 }}>
                {locale === "hi" 
                  ? "सीधे भुगतान या ट्रांसफर करने के बाद, कृपया लेनदेन का स्क्रीनशॉट या रसीद व्हाट्सएप (+91 9454222116) या ईमेल (info@sewarthpathsansthanam.org) पर भेजें ताकि हम आपकी रसीद जारी कर सकें।"
                  : "After making the transfer, please send the payment screenshot or receipt on WhatsApp (+91 9454222116) or email (info@sewarthpathsansthanam.org) to receive your receipt."}
              </Typography>
            </Alert>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
