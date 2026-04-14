import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JULIA | Herencias y Sucesiones - Nuevo León",
  description: "JULIA Herencias y Sucesiones - Especialistas en recuperar patrimonios en Nuevo León. Juicios sucesorios intestamentarios sin costo inicial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
