"use client";
import LoginModal from "@/app/components/auth/LoginModal";
import RegisterModal from "@/app/components/auth/RegisterModal";

interface AuthModalsProps {
    isLoginModalOpen?: boolean; // Optional
    isRegisterModalOpen?: boolean; // Optional
    openLoginModal?: () => void; // Optional
    openRegisterModal?: () => void; // Optional
    closeModals?: () => void; // Optional
}

export default function AuthModals({
                                       isLoginModalOpen = false,
                                       isRegisterModalOpen = false,
                                       openLoginModal = () => {},
                                       openRegisterModal = () => {},
                                       closeModals = () => {},
                                   }: AuthModalsProps) {

    return (
        <>
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={closeModals}
                onRegisterClick={openRegisterModal}
            />
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={closeModals}
                onLoginClick={openLoginModal}
            />
        </>
    );
}