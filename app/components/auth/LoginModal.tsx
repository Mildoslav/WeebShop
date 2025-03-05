"use client";
import {FormEvent, useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

interface LoginModalProps {
    handleShowModal: () => void;
    handleShowRegisterModal: () => void;
    isOpen: boolean;
}

function LoginModal({ handleShowModal, handleShowRegisterModal, isOpen }: LoginModalProps) {
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
            handleShowModal();
            return router.push("/");
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-opacity-75 bg-black z-50">
            <div
                className="bg-light rounded-lg shadow-lg p-6 w-full max-w-[400px] relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleShowModal}
                    className="absolute top-2 right-2 text-white hover:text-black"
                >
                    X
                </button>
                <form
                    className="flex flex-col justify-between items-center gap-2"
                    onSubmit={handleSubmit}
                >
                    {error && <div className="text-red-500">{error}</div>}
                    <h1 className="mb-5 w-full text-2xl font-bold">Přihlášení k vašemu účtu</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full h-8 border border-solid border-black rounded p-2"
                        name="email"
                    />
                    <div className="flex w-full">
                        <input
                            type="password"
                            placeholder="Heslo"
                            className="w-full h-8 border border-solid border-black rounded p-2"
                            name="password"
                        />
                    </div>
                    <button className="w-full border border-solid border-black rounded bg-primary hover:bg-secondary
                    transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out">
                        Přihlásit se
                    </button>
                </form>
            </div>

            <div className="bg-light rounded-lg shadow-lg p-6 w-full max-w-[400px] relative m-6">
                <h4 className="mb-5 w-full text-2xl font-bold text-center">Ještě nemáte účet?</h4>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleShowModal();
                        handleShowRegisterModal();
                    }}
                    className="w-full border border-solid border-black rounded bg-primary hover:bg-secondary
                    transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out">

                    Registrovat se
                </button>

            </div>
        </div>
    );
}

export default LoginModal;