"use client";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {FaUserCircle} from "react-icons/fa";
import React, {useState} from "react";
import LoginModal from "@/app/components/auth/LoginModal";

export default function UserAuth() {
    const { status } = useSession();
    const [open, setOpen] = useState(false)
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const showSession = () => {
        if (status === "authenticated") {
            return (
                <div onClick={() => setOpen(!open)}

                >
                    <button>
                        <FaUserCircle size={22}/>
                    </button>

                    <div className={`${open ? "block" : "hidden"} absolute bg-amber-50 text-black px-2 py-2 mt-2 rounded-lg shadow-xl -translate-x-[50%] z-50`}>
                        <ul>
                            <Link href="/">
                                <li className="text-center">Nastavení účtu</li>
                            </Link>
                            <Link href="/">
                                <li className="text-center">Historie objednávek</li>
                            </Link>
                            <Link href="/">
                                <li className="text-center">Vrácení zboží</li>
                            </Link>
                            <Link href="/">
                                <li className="text-center">Hodnocení</li>
                            </Link>
                            <button
                                className="border border-solid border-black rounded"
                                onClick={() => {
                                    signOut({redirect: false}).then(() => {
                                        router.push("/");
                                    });

                                }}
                            >
                                Sign Out
                            </button>
                        </ul>
                    </div>

                </div>
            )
        } else {
            return (
                <div>
                    <button
                        onClick={handleShowModal}
                        className="border border-solid border-black rounded p-1.5 hover:bg-pink-600
                    transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"

                    >
                        Přihlášení
                    </button>
                    <LoginModal handleShowModal={handleShowModal} isOpen={isModalOpen}/>
                </div>
            )
        }
    }
    return (
        <main className="flex flex-col items-center justify-center">
            {showSession()}
        </main>
    );
}