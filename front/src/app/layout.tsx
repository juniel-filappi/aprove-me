import type { Metadata } from "next";
import "./globals.css";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from "primereact/api";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Aprove-me",
  description: "Aprove-me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <PrimeReactProvider>
            {children}
          </PrimeReactProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
