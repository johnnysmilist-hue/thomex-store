import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { Layout } from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/toaster";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Head>
        <meta name="theme-color" content="#00B4D8" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#03071e" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Thomex" />
        <link rel="apple-touch-icon" href="/thomex-logo.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Thomex" />
      </Head>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toaster />
          <PWAInstallPrompt />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}