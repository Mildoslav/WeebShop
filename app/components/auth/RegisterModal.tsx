"use client";
import {useRef, useState} from "react";
import {register} from "../../actions/register";
import styles from "./ModalStyles.module.css";
import toast, {Toaster} from 'react-hot-toast';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginClick: () => void;
    className?: string;
}

const succes = () => toast('Registrace byla úspěšná');

export default function RegisterModal({
                                          isOpen,
                                          onClose,
                                          onLoginClick,
                                          className,
                                      }: RegisterModalProps) {
    const [error, setError] = useState<string>();
    // const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        const r = await register({
            email: formData.get("email"),
            password: formData.get("password"),
            name: formData.get("name"),
            admin: false,
        });
        ref.current?.reset();
        if (r?.error) {
            setError(r.error);
            return;
        } else {
            succes();
            onLoginClick();
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
                <h1 className="mb-5 text-2xl font-bold">Registrace</h1>
                {error && <div className="text-red-500">{error}</div>}
                <form ref={ref} action={handleSubmit} className="flex flex-col gap-2">
                    <label className="text-sm">Jméno</label>
                    <input
                        type="text"
                        placeholder="Jméno"
                        className="w-full h-8 border border-solid border-black rounded p-2 text-sm placeholder-white bg-light"
                        name="name"
                    />
                    <label className="text-sm">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full h-8 border border-solid border-black rounded p-2 placeholder-white bg-light"
                        name="email"
                    />
                    <label className="text-sm">Heslo</label>
                    <input
                        type="password"
                        placeholder="Heslo"
                        className="w-full h-8 border border-solid border-black rounded p-2 placeholder-white bg-light"
                        name="password"
                    />
                    <button
                        type="submit"
                        className="w-full border border-solid border-black rounded bg-primary hover:bg-secondary transition-all mt-2.5 p-1.5"
                    >
                        Registrovat se
                    </button>
                </form>
            </div>

            <div className={styles.modalContent2}>
                <h2 className="mb-5 text-xl font-bold text-center">Už máte účet?</h2>
                <button
                    onClick={onLoginClick}
                    className="w-full border border-solid border-black rounded bg-primary hover:bg-secondary transition-all"
                >
                    Přihlásit se
                </button>
                <button
                    onClick={succes}
                    className="w-full border border-solid border-black rounded bg-primary hover:bg-secondary transition-all"
                >
                kokot
                </button>
                <Toaster />

            </div>
        </div>
    );
}
