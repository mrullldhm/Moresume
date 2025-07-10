import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

// Load Poppins font with specific weights and subset
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Default metadata configuration for the application
export const metadata: Metadata = {
  title: {
    template: "Moresume - %s", // Dynamic title per page
    default: "Moresume", // Fallback title
  },
  description:
    "Moresume – AI Resume Builder. Create a professional, ATS-friendly resume in minutes with our free AI-powered tool. Get personalized suggestions, beat applicant tracking systems, and land more interviews with a resume tailored to your dream job.",
};

// Root layout shared across all pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Wrap entire app with ClerkProvider for authentication context
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          {/* Apply theming support (light/dark mode) using next-themes */}
          <ThemeProvider
            attribute="class" // Adds theme class to <html>
            defaultTheme="system" // Uses system preference by default
            enableSystem // Enables system theme detection
            disableTransitionOnChange // Prevents flicker on theme switch
          >
            {/* Render app pages/components */}
            {children}

            {/* Global toast notifications using Sonner */}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
