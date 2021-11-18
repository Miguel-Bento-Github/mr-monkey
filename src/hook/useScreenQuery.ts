import { ref } from "vue";

export const useScreenQuery = (query: string) => {
  const screenQuery = window.matchMedia(query);
  const matches = ref(screenQuery.matches);

  screenQuery.onchange = (e) => {
    matches.value = e.matches;
  };
  return { matches };
};
