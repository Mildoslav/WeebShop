import {redirect} from 'next/navigation'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import {connectDB} from '../../lib/mongodb'
import User from '@/lib/models/User'
import Link from "next/link";

async function getUser(email: string) {
    await connectDB()
    return User.findOne({email})
}

export default async function AdminPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }

    const user = await getUser(session.user?.email as string)

    if (!user || !user.admin) {
        redirect('/')
    }

    return (
        <div className="p-8 flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Admin</h1>
            <div className="grid gap-4">
                <ul>
                    <Link href="/admin/add-product">
                        <li>Pridat produkt</li>
                    </Link>
                    <Link href="/admin/edit-post">
                        <li>Upravit produkt</li>
                    </Link>
                    <li>nevim pico</li>
                </ul>
            </div>
        </div>
    )
}
