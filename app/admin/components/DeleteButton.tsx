"use client";

import React from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

interface DeleteButtonProps {
    id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`/api/products/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    router.refresh();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (!session?.user?.email) {
        return null;
    }

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
            Delete
        </button>
    );
};

export default DeleteButton;
