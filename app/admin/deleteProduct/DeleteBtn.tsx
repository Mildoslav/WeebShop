'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteProductButtonProps {
    productId: string | number;
    onDelete?: () => void;
}

const DeleteBtn: React.FC<DeleteProductButtonProps> = ({ productId, onDelete }) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete the product with ID: ${productId}?`)) {
            return;
        }

        setIsDeleting(true);
        setError(null);

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log(`Product ${productId} deleted.`);

            if (onDelete) {
                onDelete();
            }

            router.refresh();
        } catch (err) {
            console.error('Error deleting product:', err);
            setError((err as Error).message || 'An unexpected error occurred.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2 rounded font-semibold text-white ${
                    isDeleting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                } transition duration-150 ease-in-out`}
            >
                {isDeleting ? 'Deleting...' : 'Delete Product'}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">Error: {error}</p>}
        </div>
    );
};

export default DeleteBtn;