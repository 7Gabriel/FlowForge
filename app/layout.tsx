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
  authors: [{ name: "Gabriel" }],
  openGraph: {
    title: "FlowForge - C4 Model Architecture Diagramming",
    description: "Visualize and simulate your architecture flows in real-time",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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