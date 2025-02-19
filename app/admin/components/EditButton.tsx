"use client";

import React from "react";
import {useSession} from "next-auth/react";
import Link from "next/link";

interface EditButtonProps {
    onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = () => {
    const { data: session, status } = useSession()


    console.log(session);

    if (status === "loading" || session === null) {
        return null;
    }

    // @ts-ignore
    if (!session.admin) {
        return null;
    }

    return (
        <Link href={"/admin/edit-product"}>
            <button>Edit</button>
        // </Link>

    );
};

export default EditButton;
