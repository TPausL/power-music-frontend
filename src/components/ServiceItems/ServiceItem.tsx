import React from "react";
import { YoutubeServiceItem } from ".";
import { ServiceUser } from "../UserProvider/UserProvider";
import SpotifyServiceItem from "./SpotifyServiceItem";
export interface ServiceItemProps {
  user: ServiceUser;
}
function ServiceItem(props: ServiceItemProps) {
  switch (props.user.service) {
    case "spotify":
      return <SpotifyServiceItem {...props} />;
    case "youtube":
      return <YoutubeServiceItem {...props} />;
    default:
      throw new Error("invalid service");
  }
}

export default ServiceItem;
