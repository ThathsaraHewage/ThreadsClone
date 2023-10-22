import { DBconnection } from "@/utils/database/mongoose";
import { UserParams } from "@/utils/interfaces";
import User from "../models/user-model";
import { revalidatePath } from "next/cache";

// fetch user info
export async function fetchUser(userId: string) {
  try {
    DBconnection();

    // TODO: populate communites
    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch user : ${error.message}`);
  }
}

// update user
export async function updateUserInfo({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: UserParams): Promise<void> {
  try {
    DBconnection();

    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (err: any) {
    throw new Error(
      `Ooops...create/update user information is failed: ${err.message}`
    );
  }
}
