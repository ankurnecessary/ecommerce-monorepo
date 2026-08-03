import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@repo/ui/components/button";

export const metadata: Metadata = {
  title: "Welcome | CELEB Store",
  description: "Your CELEB Store account has been created.",
};

export default function SignupSuccessPage() {
  return (
    <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Welcome!</h1>

      <p className="mt-3 text-muted-foreground">
        You are now part of our store. Please continue shopping.
      </p>

      <Button asChild className="mt-6">
        <Link href="/">Continue shopping</Link>
      </Button>
    </main>
  );
}