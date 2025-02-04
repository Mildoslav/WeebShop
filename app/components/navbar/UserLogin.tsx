"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserLogin() {
    const { status } = useSession();
    const router = useRouter();

    const showSession = () => {
        if (status === "authenticated") {
            return (
                <button
                    className="border border-solid border-black rounded"
                    onClick={() => {
                        signOut({ redirect: false }).then(() => {
                            router.push("/");
                        });

                    }}
                >
                    Sign Out
                </button>
            )
        } else if (status === "loading") {
            return (
                <span className="text-[#888] text-sm mt-7">Loading...</span>
            )
        } else {
            return (
                <Link
                    href="/login"
                    className="border border-solid border-black rounded hover:bg-pink-600"
                >
                    Přihlášení
                </Link>
            )
        }
    }
    return (
        <main className="flex flex-col items-center justify-center">
            {showSession()}
        </main>
    );
}