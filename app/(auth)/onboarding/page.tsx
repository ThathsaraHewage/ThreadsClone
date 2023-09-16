import UserProfile from "@/components/forms/UserProfile";
import { currentUser } from "@clerk/nextjs";

async function OnBoarding() {
  // check current user
  const user = await currentUser();
  if (!user) return null;

  // current user information
  const userData = {
    id: "",
    objectId: "",
    username: "",
    name: "",
    bio: "",
    image: "",
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
