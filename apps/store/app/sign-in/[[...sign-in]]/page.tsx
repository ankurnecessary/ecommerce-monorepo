import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | CELEB Store",
  description: "Sign into CELEB Store account.",
};

export default function SignupPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-12">
      <SignIn />
    </main>
  );
}
