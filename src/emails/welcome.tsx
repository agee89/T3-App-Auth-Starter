
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

interface WelcomeEmailProps {
    name?: string | null;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>Welcome to {process.env.NEXT_PUBLIC_APP_NAME ?? "T3 App"}!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Welcome, {name || "there"}!</Heading>
                <Text style={text}>
                    We are thrilled to have you onboard. Your account has been successfully verified.
                </Text>
                <Text style={text}>
                    You can now access your dashboard and explore all the features we have to offer.
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href={`${process.env.NEXTAUTH_URL}/dashboard`}>
                        Go to Dashboard
                    </Button>
                </Section>
                <Text style={text}>
                    If you have any questions, feel free to reply to this email.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default WelcomeEmail;

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
