import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | CELEB Store",
  description: "Create a CELEB Store account.",
};

export default function SignupPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold">Create an account</h1>
      <p className="mt-2 text-muted-foreground">
        Enter your details to create an account.
      </p>
    </main>
  );
}
