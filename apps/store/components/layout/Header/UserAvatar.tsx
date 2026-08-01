import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/ui/components/avatar";
import { UserIcon } from "lucide-react";
import React from "react";

type UserAvatarProps = {
  imageUrl?: string | null;
  name?: string;
};

const UserAvatar = ({ imageUrl, name = "User" }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage
        src={imageUrl || undefined}
        alt={`${name}'s profile picture`}
      />

      <AvatarFallback>
        <UserIcon size={16} aria-hidden="true" />
        <span className="sr-only">{name}&apos;s default profile picture</span>
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
