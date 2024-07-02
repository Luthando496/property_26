import { Inter } from "next/font/google";
import "@/assets/styles/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Property 26",
  description: "Find The Perfect Property.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
