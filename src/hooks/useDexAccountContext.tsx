import { useContext } from "react";
import { DexAccountContext } from "../contexts/DexAccountProvider";

export const useDexAccountContext = () => useContext(DexAccountContext);
