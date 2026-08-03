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
import {
  LogInIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { Show, useClerk, useUser } from "@clerk/nextjs";

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
        <Show when="signed-out">
          <DropdownMenuItem asChild>
            <Link
              href={"/sign-up"}
              className="inline-flex w-full cursor-pointer"
            >
              <UserPlus size={16} className="ml-1 mr-2" />
              Sign up
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/sign-in"} className="inline-flex w-full cursor-pointer">
              <LogInIcon size={16} className="ml-1 mr-2" />
              Sign in
            </Link>
          </DropdownMenuItem>
        </Show>
        <Show when="signed-in">
          <DropdownMenuItem asChild>
            <Link href={"#"} className="inline-flex w-full cursor-pointer">
              <UserIcon size={16} className="ml-1 mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"#"} className="inline-flex w-full cursor-pointer">
              <SettingsIcon size={16} className="ml-1 mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => void signOut({ redirectUrl: "/" })}
            className="cursor-pointer"
          >
            <LogOutIcon size={16} className="ml-1 mr-2" />
            Sign out
          </DropdownMenuItem>
        </Show>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatarDropdown;
