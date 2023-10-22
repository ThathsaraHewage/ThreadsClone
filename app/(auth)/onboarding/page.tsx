import UserProfile from "@/components/forms/UserProfile";
import { fetchUser } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function OnBoarding() {
  // check current user
  const user = await currentUser();
  if (!user) return null;

  const userInfo: any = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  // current user information
  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Welcome Onboard</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile to connect with Verse
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <UserProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default OnBoarding;
