import axios from "axios";
import React, { useEffect, useState } from "react";
import { Service } from "../UserProvider/UserProvider";
export type PlaylistsContextType = {
  playlists: Playlist[];
};
export const PlaylistsContext = React.createContext<PlaylistsContextType>({
  playlists: [],
});
export interface PlaylistsProviderProps {
  children: React.ReactNode;
}
export interface Playlist {
  id: string;
  title: string;
  source: Service;
  count: number;
  thumbnail: string;
}
export default function PlaylistsProvider(props: PlaylistsProviderProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    axios.get("playlists").then((res) => setPlaylists(res.data.object));
  }, []);

  return (
    <PlaylistsContext.Provider value={{ playlists }}>
      {props.children}
    </PlaylistsContext.Provider>
  );
}
