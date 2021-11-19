import { ref, watch } from "vue";
import { useScreenQuery } from "./useScreenQuery";

interface Doodle extends HTMLElement {
  update: () => null;
}

export const useDoodle = () => {
  const doodle = ref<Doodle>();
  const isBackgroundActive = ref(false);
  let doodleIntervalID: number;

  watch(isBackgroundActive, () => {
    const background = document.getElementById("background");
    const { matches } = useScreenQuery("(prefers-reduced-motion)");
    if (background && !matches.value) background.classList.remove("hidden");
  });

  const toggleBackgroundDoodle = () => {
    isBackgroundActive.value = true;
    updateDoodle();
  };

  const updateDoodle = () => {
    doodleIntervalID = setInterval(() => {
      doodle.value?.update();
    }, 1500);

    doodle.value?.update();
  };

  const clearDoodle = () => {
    clearInterval(doodleIntervalID);
  };

  return {
    doodle,
    isBackgroundActive,
    toggleBackgroundDoodle,
    updateDoodle,
    clearDoodle,
  };
};
