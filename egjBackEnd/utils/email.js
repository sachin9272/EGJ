import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config({
  path: fileURLToPath(new URL("../.env", import.meta.url)),
  override: true,
});

const emailUser = process.env.EMAIL_USER?.trim();
const emailPass = process.env.EMAIL_PASS?.replace(/\s+/g, "");

// Create a reusable transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser, // your Gmail
    pass: emailPass, // Gmail App Password
  },
});

const getMailOptions = ({ to, subject, html, replyTo, attachments = [] }) => ({
  from: `"Expeditions George of the Jungle" <${emailUser}>`,
  to,
  subject,
  html,
  ...(replyTo ? { replyTo } : {}),
  attachments,
});

export async function sendEmailStrict({ to, subject, html, replyTo, attachments = [] }) {
  const info = await transporter.sendMail(
    getMailOptions({ to, subject, html, replyTo, attachments })
  );
  console.log(`Email sent to ${to}`);
  return info;
}

// Function to send email
export async function sendEmail({ to, subject, html, replyTo, attachments = [] }) {
  try {
    await sendEmailStrict({ to, subject, html, replyTo, attachments });
  } catch (err) {
    console.error("Error sending email:", err);
  }
}
