import type { Metadata } from "next";
import { Inter, Pinyon_Script, Pixelify_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const pixelify = Pixelify_Sans({ variable: "--font-pixelify", subsets: ["latin"] });
const pinyon = Pinyon_Script({ variable: "--font-pinyon", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: { default: "YasTech.3D | Impressões 3D sob encomenda", template: "%s | YasTech.3D" },
  description:
    "Capinhas de isqueiro, chaveiros, porta cigarro e outras coisinhas fofas impressas em 3D sob encomenda. Peça pelo Instagram @yastech.3d.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${pixelify.variable} ${pinyon.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
