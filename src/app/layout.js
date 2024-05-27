import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import {AppWraper} from "@/app/context";
const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "OCR4Cards",
    description: "Helps users extract all the information's from photographed business cards",
};

export default function RootLayout({children}) {

    return (
        <html lang="en">
        <body className={inter.className}>
        <AppWraper>
            {children}
        </AppWraper>
        </body>
        </html>
    );
}
