import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { ServiceUser } from "../UserProvider/UserProvider";
import SkeletonItem from "./SkeletonItem";

export interface SpotifyServiceItemProps {
  user: ServiceUser;
}
export default function SpotifyServiceItem(props: SpotifyServiceItemProps) {
  return <SkeletonItem icon={faSpotify} {...props} />;
}
