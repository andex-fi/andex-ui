import { ReactNode, createContext, useMemo, useState } from "react";

interface UIContextType {
  isDarkMode: boolean;
  handleDarkMode: () => void;
}

const initialState = {
  isDarkMode: false,
  handleDarkMode: () => {},
};

export const UiState = createContext<UIContextType>(initialState);

const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    console.log(isDarkMode);
  };

  const values = useMemo(
    () => ({
      isDarkMode,
      handleDarkMode,
    }),
    [isDarkMode]
  );

  return <UiState.Provider value={values}>{children}</UiState.Provider>;
};

export default UIProvider;
