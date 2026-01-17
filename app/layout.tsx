import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppModeProvider } from '@/contexts/AppModeContext';
import { WorkflowExecutionProvider } from '@/contexts/WorkflowExecutionContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlowForge - C4 Model Architecture Diagramming",
  description: "The ultimate C4 Model diagramming tool with live simulation. Visualize and simulate your architecture flows in real-time.",
  keywords: "c4-model, architecture, diagram, visualization, simulation, system-design, flowchart",
  authors: [{ name: "João Gabriel" }],
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "FlowForge - C4 Model Architecture Diagramming",
    description: "Visualize and simulate your architecture flows in real-time",
    images: ['/logo-512.png'],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowForge - C4 Model Architecture Diagramming",
    description: "Visualize and simulate your architecture flows in real-time",
    images: ['/logo-512.png'],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/public/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/public/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <AppModeProvider>
          <WorkflowExecutionProvider>
            {children}
          </WorkflowExecutionProvider>
        </AppModeProvider>
      </body>
    </html>
  );
}