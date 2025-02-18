"use client";

import React from "react";
import {useSession} from "next-auth/react";

interface EditButtonProps {
    onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
    const { data: session, status } = useSession()


    console.log(session);

    if (status === "loading" || session === null) {
        return null;
    }

    if (!session.admin) {
        return null;
    }

    return (
        <button onClick={onClick}>
            Edit
        </button>
    );
};

export default EditButton;
