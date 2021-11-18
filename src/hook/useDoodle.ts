import { ref, watch } from "vue";

interface Doodle extends HTMLElement {
  update: () => null;
}

export const useDoodle = () => {
  const doodle = ref<Doodle>();
  const isBackgroundActive = ref(false);
  let doodleIntervalID: number;

  watch(isBackgroundActive, () => {
    const background = document.getElementById("background");
    if (background) background.style.display = "initial";
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
