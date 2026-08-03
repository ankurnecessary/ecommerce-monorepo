"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@repo/ui/components/dropdown-menu";
import React from "react";
import UserAvatar from "./UserAvatar";
import { LogInIcon, LogOutIcon, UserIcon, UserPlus } from "lucide-react";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";

const UserAvatarDropdown = () => {
  const { signOut } = useClerk();
  const { user, isLoaded, isSignedIn } = useUser();
  const avatarImageUrl =
    isLoaded && isSignedIn && user?.hasImage ? user.imageUrl : undefined;

  const avatarName = isSignedIn
    ? (user?.fullName ?? user?.username ?? "User")
    : "Guest";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open user menu"
          className="cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <UserAvatar
            key={!isLoaded ? "loading" : isSignedIn ? user?.id : "signed-out"}
            name={avatarName}
            imageUrl={avatarImageUrl}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!isLoaded ? (
          <DropdownMenuItem disabled>Loading…</DropdownMenuItem>
        ) : !isSignedIn ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/sign-up" className="w-full cursor-pointer">
                <UserPlus className="mr-2 size-4" aria-hidden="true" />
                Sign up
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/sign-in" className="w-full cursor-pointer">
                <LogInIcon className="mr-2 size-4" aria-hidden="true" />
                Sign in
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem disabled asChild>
              <Link href="/profile" className="w-full cursor-pointer">
                <UserIcon className="mr-2 size-4" aria-hidden="true" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => void signOut({ redirectUrl: "/" })}
            >
              <LogOutIcon className="mr-2 size-4" aria-hidden="true" />
              Sign out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatarDropdown;
