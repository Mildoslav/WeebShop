"use client";
import {useState} from "react";
import LoginModal from "@/app/components/auth/LoginModal";
import RegisterModal from "@/app/components/auth/RegisterModal";

export default function AuthModals() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);
    const handleRegisterModal = () => setIsRegisterModalOpen(!isRegisterModalOpen);

    return (
        <>
            <LoginModal
                handleShowModal={handleLoginModal}
                handleShowRegisterModal={handleRegisterModal}
                isOpen={isLoginModalOpen}
            />
            <RegisterModal
                handleShowModal={handleRegisterModal}
                isOpen={isRegisterModalOpen}
            />
        </>
    );
}
