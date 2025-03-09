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


    if (!session?.user?.email) {
        return null;
    }

    return (
        <Link href={`/admin/edit-product/${props.id}`}>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                Edit
            </button>
        </Link>

    );
};

export default EditButton;
