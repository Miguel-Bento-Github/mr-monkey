import { useScreenQuery } from "@/hook/useScreenQuery";

export const useDarkTheme = () => {
  const { matches: isDark } = useScreenQuery("(prefers-color-scheme: dark)");
  return { isDark };
};
