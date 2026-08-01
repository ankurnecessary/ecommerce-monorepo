import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@repo/ui/components/dropdown-menu";
import React from "react";
import UserAvatar from "./UserAvatar";
import {
  LogInIcon,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

const UserAvatarDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open user menu"
          className="cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <UserAvatar />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={"/signup"} className="inline-flex w-full" >
            <UserPlus size={16} className="ml-1 mr-2" />
            Sign up
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"#"} className="inline-flex w-full">
            <LogInIcon size={16} className="ml-1 mr-2" />
            Sign in
          </Link>
        </DropdownMenuItem>

        {/* <DropdownMenuItem>
          <Link href={"#"} className="inline-flex w-full">
            <UserIcon size={16} className="ml-1 mr-2" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"#"} className="inline-flex w-full">
            <SettingsIcon size={16} className="ml-1 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"#"} className="inline-flex w-full">
            <LogOutIcon size={16} className="ml-1 mr-2" />
            Sign out
          </Link>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatarDropdown;
