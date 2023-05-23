import { useContext } from "react";
import { AccountContext } from "../contexts/AccountProvider";

export const useAccountContext = () => useContext(AccountContext);
