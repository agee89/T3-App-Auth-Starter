
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

interface VerifyEmailProps {
    verificationUrl: string;
}

export const VerifyEmail = ({ verificationUrl }: VerifyEmailProps) => (
    <Html>
        <Head />
        <Preview>Verify your email address for {process.env.NEXT_PUBLIC_APP_NAME ?? "T3 App"}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Verify your email address</Heading>
                <Text style={text}>
                    Thanks for starting the new {process.env.NEXT_PUBLIC_APP_NAME ?? "T3 App"} account creation process. We
                    want to make sure it's really you. Please click the button below to
                    verify your email address.
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href={verificationUrl}>
                        Verify Email Address
                    </Button>
                </Section>
                <Text style={text}>
                    If you didn't request this, you can safely ignore this email.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default VerifyEmail;

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
