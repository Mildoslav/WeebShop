import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
// @ts-ignore
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectDB } from '../lib/mongodb'
import User from '../lib/models/User'

async function getUser(email: string) {
    await connectDB()
    return User.findOne({ email })
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
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Admin</h1>
            <div className="grid gap-4">
                <ul>
                    <li>Pridat produkt</li>
                    <li>Upravit produkt</li>
                    <li>nevim pico</li>
                </ul>
            </div>
        </div>
    )
}
