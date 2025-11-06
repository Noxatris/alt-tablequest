import type { Metadata } from "next";
import { cinzel, forum } from "./fonts";
import "./globals.css";
import Header from "./(components)/Header";
import DisclaimerModal from "./(components)/DisclaimerModal";
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
  const disclaimerMessage = "Ce site est une démo de refonte non-commandée, réalisée par Noxatrisdev pour présenter des compétences en design et développement Next.js/Animation.";

  return (
    <html lang="fr">
      <body
        className={`${cinzel.variable} ${forum.variable} antialiased`}
      >
        <Header />
        <DisclaimerModal
                title="Avertissement - Projet Non Commandé - Fictif"
                message={disclaimerMessage}
                buttonText="Je comprends et je continue"
                className="bg-black/80" 
            />
        {children}
        <Footer />
      </body>
    </html>
  );
}
