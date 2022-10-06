import { ThemeContext } from "@/contexts/Theme";
import { useContext } from "react";

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  return { ...theme };
}