"use client";

import React from "react";
import {useSession} from "next-auth/react";
import Link from "next/link";

interface EditButtonProps {
    id : string
}

const EditButton: React.FC<EditButtonProps> = (props) => {
    const { data: session, status } = useSession()




    if (status === "loading" || session === null) {
        return null;
    }

    // @ts-ignore
    if (!session.admin) {
        return null;
    }

    return (
        <Link href={`/admin/edit-product/${props.id}`}>
            <button>Edit</button>
         </Link>

    );
};

export default EditButton;
