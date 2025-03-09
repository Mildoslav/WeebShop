"use client";
import {FormEvent, useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import styles from "./ModalStyles.module.css";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegisterClick: () => void;
    className?: string;
}

export default function LoginModal({
                                       isOpen,
                                       onClose,
                                       onRegisterClick,
                                       className,
                                   }: LoginModalProps) {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });
        if (res?.error) {
            setError(res.error as string);
        }
        if (res?.ok) {
            return router.push("/");
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div
                className={styles.modalContent + (className ? " " + className : "")}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className={styles.closeButton}>
                    X
                </button>
                <h1 className="mb-5 text-2xl font-bold">Přihlášení k vašemu účtu</h1>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    {error && <div className="text-red-500">{error}</div>}
                    {/*<h1 className="mb-5 text-2xl font-bold">Přihlášení k vašemu účtu</h1>*/}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full h-8 border border-solid border-black rounded p-2 placeholder-white bg-light"
                        name="email"
                    />
                    <input
                        type="password"
                        placeholder="Heslo"
                        className="w-full h-8 border border-solid border-black rounded p-2 placeholder-white bg-light"
                        name="password"
                    />
                    <button
                        type="submit"
                        className="w-full border border-solid border-black rounded bg-primary hover:bg-secondary transition-all text-white"
                    >
                        Přihlásit se
                    </button>
                </form>
            </div>

            <div className={styles.modalContent + " mt-6"}>
            <h4 className="mb-5 text-2xl font-bold text-center">Ještě nemáte účet?</h4>
                <button
                    onClick={onRegisterClick}
                    className="w-full border border-solid border-black rounded bg-primary hover:bg-secondary transition-all"
                >
                    Registrovat se
                </button>
            </div>
        </div>
    );
}
