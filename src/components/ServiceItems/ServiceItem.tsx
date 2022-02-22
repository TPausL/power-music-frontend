import React from "react";
import { YoutubeServiceItem } from ".";
export interface ServiceItemProps {
  service: "youtube" | "spotify";
}
function ServiceItem(props: ServiceItemProps) {
  switch (props.service) {
    case "spotify":
      return <>not implemented</>;
    case "youtube":
      return <YoutubeServiceItem />;
    default:
      throw new Error("invalid service");
  }
}

export default ServiceItem;
