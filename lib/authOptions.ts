import {connectDB} from "./mongodb";
import User from "@/lib/models/User";
import type {NextAuthOptions} from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        credentials({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({
                    email: credentials?.email,
                }).select("+password");

                if (!user) throw new Error("Wrong Email");

                const passwordMatch = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );

                if (!passwordMatch) throw new Error("Wrong Password");
                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    }, callbacks: {
        async session({session}) {
            await connectDB();

            const email = session?.user?.email;
            const data = await User.findOne({
                email
            }).exec()

            if (data.admin) {
                session.admin = true;
            }

            return session;
        }
    }
};