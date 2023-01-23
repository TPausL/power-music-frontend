import axios from "axios";
import React, { useState } from "react";
import { Playlist } from "../../api";
export type Direction = "left" | "right" | "both";
export interface Merge {
  left: Playlist;
  right: Playlist;
  direction: Direction;
}
export type MergesContextType = {
  merges: Merge[];
};
export const MergesContext = React.createContext<MergesContextType>({
  merges: [],
});
export interface MergesProviderProps {
  children: React.ReactNode;
}
export default function MergesProvider(props: MergesProviderProps) {
  const [merges, setMerges] = useState<Merge[]>([]);
  React.useEffect(() => {
    // axios.get("merges").then((res) => {
    //   setMerges(res.data.object);
    // });
    setMerges([{
      direction: "both",
      left: {
        id: "spotify:playlist:4dDnPnBwNA9csMmR1Q0H1P",
        count: 5,
        editable: true,
        hidden: false,
        link: "",
        source: "spotify",
        thumbnail: "",
        title: "all the music"
      },
      right: {
        id: "spotify:playlist:5ztgw6XiQOWNP1PrQT0Kyi",
        count: 100,
        editable: true,
        hidden: false,
        link: "",
        source: "spotify",
        thumbnail: "",
        title: "common jamer"
      }
    }])
  }, []);
  return (
    <MergesContext.Provider value={{ merges }}>
      {props.children}
    </MergesContext.Provider>
  );
}
