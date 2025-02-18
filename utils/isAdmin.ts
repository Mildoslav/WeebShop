import {connectDB} from "@/lib/mongodb";
import User from "@/lib/models/User";
import {User as NextAuthUser} from "next-auth"; // Import the correct User type

export async function isAdmin(user: NextAuthUser | undefined): Promise<boolean> {
    if (!user || !user.email) {
        return false; // Handle cases where user or email is undefined
    }

    try {
        await connectDB();

        const dbUser = await User.findOne({ email: user.email });

        return !!(dbUser && dbUser.admin);
    } catch (error) {
        console.error("Error checking admin status:", error);
        return false;
    }
}
