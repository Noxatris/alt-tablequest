import type { Metadata } from "next";
import { cinzel, forum } from "./fonts";
import "./globals.css";
import Header from "./(components)/Header";
import Footer from "./(components)/Footer";

export const metadata: Metadata = {
  title: "Tablequest | Refonte Prototype",
  description: "Maquette pour une refont du site Tablequest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${cinzel.variable} ${forum.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
