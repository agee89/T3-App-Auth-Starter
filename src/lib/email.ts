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

export const sendVerificationEmail = async (email: string, token: string) => {
    const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Verify your email address",
        html: `
      <div>
        <h1>Verify your email</h1>
        <p>Click the link below to verify your email address:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
      </div>
    `,
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Reset your password",
        html: `
      <div>
        <h1>Reset your password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      </div>
    `,
    });
};
