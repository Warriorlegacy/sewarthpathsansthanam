import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import nodemailer from "nodemailer";

export async function generate80GReceiptPdf(donationDetails: {
  receiptNo: string;
  donorName: string;
  donorPan: string;
  amount: number;
  date: string;
  purpose: string;
}): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const { height } = page.getSize();
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Header
  page.drawText("SEWARTH PATH SANSTHANAM", { x: 50, y: height - 50, size: 20, font: boldFont, color: rgb(0.88, 0.48, 0.22) });
  page.drawText("Plot No. 516, Kamlesh Nagar, Bhagwanpur, Lanka, Varanasi - 221005, UP", { x: 50, y: height - 70, size: 10, font });
  page.drawText("Reg. No. 202200996052093 | Indian Trusts Act 1882", { x: 50, y: height - 85, size: 10, font });
  
  // Title
  page.drawText("80G DONATION RECEIPT", { x: 200, y: height - 130, size: 16, font: boldFont });

  // Details
  page.drawText(`Receipt No: ${donationDetails.receiptNo}`, { x: 50, y: height - 180, size: 12, font: boldFont });
  page.drawText(`Date: ${donationDetails.date}`, { x: 400, y: height - 180, size: 12, font });

  page.drawText(`Received with thanks from: ${donationDetails.donorName}`, { x: 50, y: height - 220, size: 12, font });
  page.drawText(`PAN Number: ${donationDetails.donorPan || "Not Provided"}`, { x: 50, y: height - 250, size: 12, font });
  page.drawText(`Amount (INR): ₹${donationDetails.amount.toLocaleString("en-IN")}`, { x: 50, y: height - 280, size: 12, font: boldFont });
  page.drawText(`Purpose: ${donationDetails.purpose}`, { x: 50, y: height - 310, size: 12, font });

  // 80G Statement
  page.drawText("Donations are eligible for tax deduction under section 80G of the Income Tax Act, 1961.", { x: 50, y: height - 380, size: 10, font });
  page.drawText("Subject to Varanasi Jurisdiction.", { x: 50, y: height - 395, size: 10, font });

  // Signature
  page.drawText("Authorized Signatory", { x: 400, y: height - 460, size: 12, font: boldFont });
  page.drawText("Sewarth Path Sansthanam", { x: 400, y: height - 475, size: 10, font });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export async function sendReceiptEmail(
  toEmail: string,
  donorName: string,
  pdfBytes: Uint8Array,
  receiptNo: string
) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("Email configuration missing. Skipping email send.");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Sewarth Path Sansthanam" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Donation Receipt - ${receiptNo} - Sewarth Path Sansthanam`,
      text: `Dear ${donorName},\n\nThank you for your generous donation to Sewarth Path Sansthanam. Please find your 80G donation receipt attached.\n\nWarm regards,\nSewarth Path Sansthanam`,
      html: `<p>Dear <strong>${donorName}</strong>,</p><p>Thank you for your generous donation to Sewarth Path Sansthanam. Please find your 80G donation receipt attached.</p><p>Warm regards,<br/>Sewarth Path Sansthanam</p>`,
      attachments: [
        {
          filename: `Receipt_${receiptNo}.pdf`,
          content: Buffer.from(pdfBytes),
        },
      ],
    });

    return !!info.messageId;
  } catch (error) {
    console.error("Error sending receipt email:", error);
    return false;
  }
}
