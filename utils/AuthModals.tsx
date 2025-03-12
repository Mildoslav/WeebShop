"use client";
import LoginModal from "@/app/components/auth/LoginModal";
import RegisterModal from "@/app/components/auth/RegisterModal";

interface AuthModalsProps {
    isLoginModalOpen: boolean;
    isRegisterModalOpen: boolean;
    openLoginModal: () => void;
    openRegisterModal: () => void;
    closeModals: () => void;
}

export default function AuthModals({
                                       isLoginModalOpen,
                                       isRegisterModalOpen,
                                       openLoginModal,
                                       openRegisterModal,
                                       closeModals,
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
