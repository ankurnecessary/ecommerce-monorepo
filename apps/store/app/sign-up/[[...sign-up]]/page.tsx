import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | CELEB Store",
  description: "Create a CELEB Store account.",
};

export default function SignupPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-12">
      <SignUp forceRedirectUrl="/signup-success"/>
    </main>
  );
}
