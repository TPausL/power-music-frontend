import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { getUserPlaylists, Playlist } from "../../api";
import { Service } from "../UserProvider/UserProvider";
import * as Oazapfts from "oazapfts/lib/runtime";
export type PlaylistsContextType = {
  playlists: Playlist[];
};
export const PlaylistsContext = React.createContext<PlaylistsContextType>({
  playlists: [],
});
export interface PlaylistsProviderProps {
  children: React.ReactNode;
}

export default function PlaylistsProvider(props: PlaylistsProviderProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const loaded = useRef<boolean>(false);

  const fetch = async() => {
    try {
      const res = (await getUserPlaylists() as Oazapfts.WithHeaders<{
        status: 200;
        data: Playlist[];
    }>).data
      setPlaylists(res as Playlist[] )
    } catch (error) {
      console.log(error)
    }
    loaded.current = true;
  }

  useEffect(() => {
    console.log("hello")
    if (!loaded.current) {
      fetch()
    }
  }, []);

  return (
    <PlaylistsContext.Provider value={{ playlists }}>
      {props.children}
    </PlaylistsContext.Provider>
  );
}
