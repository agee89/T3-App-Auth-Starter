
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
    resetUrl: string;
}

export const ResetPasswordEmail = ({ resetUrl }: ResetPasswordEmailProps) => (
    <Html>
        <Head />
        <Preview>Reset your password for T3 App Auth Starter</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Reset your password</Heading>
                <Text style={text}>
                    We received a request to reset the password for your T3 App Auth Starter
                    account. If you made this request, click the button below to reset your
                    password.
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href={resetUrl}>
                        Reset Password
                    </Button>
                </Section>
                <Text style={text}>
                    If you didn't request this, you can safely ignore this email. Your
                    password will not be changed.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default ResetPasswordEmail;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "560px",
};

const h1 = {
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "1.1",
    margin: "0 0 15px",
};

const text = {
    fontSize: "16px",
    lineHeight: "1.4",
    color: "#484848",
};

const btnContainer = {
    textAlign: "center" as const,
    margin: "20px 0",
};

const button = {
    backgroundColor: "#000000",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px 20px",
};
