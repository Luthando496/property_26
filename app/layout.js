import { Inter } from "next/font/google";
import "@/assets/styles/global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Property 26",
  description: "Find The Perfect Property.",
  keywords: ["property, real estate, rent, buy"],
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
    <html lang="en">
    <body>
      <Navbar />
      <main >{children}</main>
      <Footer />
    </body>
    </html>
    </AuthProvider>
  );
}
