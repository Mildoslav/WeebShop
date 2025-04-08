"use client";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {FaUserCircle} from "react-icons/fa";
import React, {useState} from "react";
import AuthModals from "@/utils/AuthModals";

export default function UserAuth() {
    const { status } = useSession();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsRegisterModalOpen(false);
    };

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
        setIsLoginModalOpen(false);
    };

    const closeModals = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(false);
    };

    const showSession = () => {
        if (status === "authenticated") {
            return (
                <div onClick={() => setOpen(!open)}>
                    <button className="flex">
                        <FaUserCircle size={22} />
                    </button>
                    <div
                        className={`${open ? "block" : "hidden"} absolute bg-amber-50 text-black mt-2 rounded-lg shadow-xl -translate-x-[50%] z-50`}>
                        <ul>
                            <Link href="/">
                                <li className="text-center px-2 py-1 hover:bg-gray-600 hover:text-white">Nastavení
                                    účtu
                                </li>
                            </Link>
                            <Link href="/">
                                <li className="text-center px-2 py-1 hover:bg-gray-600 hover:text-white">Historie
                                    objednávek
                                </li>
                            </Link>
                            <Link href="/">
                                <li className="text-center px-2 py-1 hover:bg-gray-600 hover:text-white">Vrácení zboží
                                </li>
                            </Link>
                            <Link href="/">
                                <li className="text-center px-2 py-1 hover:bg-gray-600 hover:text-white">Hodnocení</li>
                            </Link>
                            <button
                                className="text-center px-2 py-1 hover:bg-gray-600 w-full hover:text-white"
                                onClick={() => signOut({ redirect: false }).then(() => router.push("/"))}
                            >
                                Sign Out
                            </button>
                        </ul>
                    </div>
                </div>
            );
        }
        return (
            <>
                    <button onClick={openLoginModal}>
                        Přihlásit se
                    </button>
                <AuthModals
                    isLoginModalOpen={isLoginModalOpen}
                    isRegisterModalOpen={isRegisterModalOpen}
                    openLoginModal={openLoginModal}
                    openRegisterModal={openRegisterModal}
                    closeModals={closeModals}
                />
            </>
        );
    };

    return (
        <main className="flex flex-col items-center justify-center">
            {showSession()}
        </main>
    );
}
