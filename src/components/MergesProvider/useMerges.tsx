import { useContext } from "react";
import { MergesContext, MergesContextType } from "./MergesProvider";

export default function useMerges() {
  return useContext<MergesContextType>(MergesContext);
}
