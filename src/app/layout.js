import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./pages/api/auth/[...nextauth]/options";
import SessionProvider from "./components/SessionProvider";
import Login from "@/app/components/Login";
import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  // const session = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> 
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <h1>Logged In</h1>
          )}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
