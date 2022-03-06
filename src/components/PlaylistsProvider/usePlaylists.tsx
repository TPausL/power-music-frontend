import { useContext } from "react";
import { PlaylistsContext, PlaylistsContextType } from "./PlaylistsProvider";

export default function usePlaylists() {
  return useContext<PlaylistsContextType>(PlaylistsContext);
}
