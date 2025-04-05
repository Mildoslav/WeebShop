// app/admin/page.tsx
import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';
import {connectDB} from '../../lib/mongodb';
import User from '@/lib/models/User';

async function getUser(email: string) {
    await connectDB();
    return User.findOne({ email });
}

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    const user = await getUser(session.user?.email as string);

    if (!user || !user.admin) {
        redirect('/');
    }

    return (
        <div className="p-4"> {/* Removed AdminLayout */}
            <h1 className="text-3xl font-bold">Orders</h1>
        </div>
    );
}