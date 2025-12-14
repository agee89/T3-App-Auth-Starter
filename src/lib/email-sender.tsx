import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

import { render } from "@react-email/render";
import VerifyEmail from "@/emails/verify-email";
import ResetPasswordEmail from "@/emails/reset-password";

const sender = process.env.SENDER_NAME
  ? `"${process.env.SENDER_NAME}" <${process.env.EMAIL_FROM}>`
  : process.env.EMAIL_FROM;

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
  const emailHtml = await render(<VerifyEmail verificationUrl={verificationUrl} />);

  await transporter.sendMail({
    from: sender,
    to: email,
    subject: "Verify your email address",
    html: emailHtml,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
  const emailHtml = await render(<ResetPasswordEmail resetUrl={resetUrl} />);

  await transporter.sendMail({
    from: sender,
    to: email,
    subject: "Reset your password",
    html: emailHtml,
  });
};

import WelcomeEmail from "@/emails/welcome";

export const sendWelcomeEmail = async (email: string, name?: string | null) => {
  const emailHtml = await render(<WelcomeEmail name={name} />);

  await transporter.sendMail({
    from: sender,
    to: email,
    subject: `Welcome to ${process.env.NEXT_PUBLIC_APP_NAME ?? "T3 App"}`,
    html: emailHtml,
  });
};
