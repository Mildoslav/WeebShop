import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    })
        .middleware(async () => {
            const session = await getServerSession(authOptions);

            if (!session || !session.user) {
                throw new UploadThingError("Unauthorized");
            }

            await connectDB();
            const user = await User.findOne({ email: session.user.email });

            if (!user || !user.admin) {
                throw new UploadThingError("You are not authorized to upload images.");
            }

            return { userId: user._id.toString() }; // Return userId as string
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

