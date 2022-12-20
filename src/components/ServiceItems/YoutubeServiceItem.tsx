import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { ServiceUser } from "../UserProvider/UserProvider";
import SkeletonItem from "./SkeletonItem";

export interface YoutubeServiceItemProps {
  user: ServiceUser;
}
export default function YoutubeServiceItem(props: YoutubeServiceItemProps) {
  return <SkeletonItem icon={"youtube"} {...props} />;
}
