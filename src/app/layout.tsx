import { Exo } from "next/font/google";
import "./sass/style.scss";

const exo = Exo({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={exo.className}>{children}</body>
    </html>
  );
}
