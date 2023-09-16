import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function OnBoarding() {
  // check current user
  const User = await currentUser();
  if (!User) return null;

  // current user information

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now, to use Threds.
      </p>

      <section className="mt-9 bg-dark-2 p-10"></section>
    </main>
  );
}

export default OnBoarding;
