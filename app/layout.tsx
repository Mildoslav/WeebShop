import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import {Provider} from "./provider";
import CategoryNavbar from "@/app/components/navbar/CategoryNavbar";
import Sidebar from "@/app/components/sidebar/Sidebar";
import React from "react";
import AuthModals from "../utils/AuthModals"
import {getServerSession} from "next-auth";
import ThemeCategory from "@/app/components/products/ThemeCategory";
import {CartProvider} from "@/app/contexts/CartContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider session={session}>
            <CartProvider>
                <div className="min-h-screen">
                    <Navbar/>
                    <CategoryNavbar/>
                    <ThemeCategory/>
                    <div className="flex flex-wrap">
                        <aside className="hidden sm:hidden md:hidden lg:block xl:block 2xl:block w-64 min-h-screen">
                            <Sidebar/>
                        </aside>
                        <main className="flex-1 p-4">
                            <AuthModals/>
                            {children}
                        </main>
                    </div>
                </div>
            </CartProvider>
        </Provider>
        </body>
        </html>
    );
}
