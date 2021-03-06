<script lang="ts">
import { defineComponent, ref } from "vue";
import "css-doodle";
import { useDoodle } from "@/hook/useDoodle";
import { useScreenQuery } from "@/hook/useScreenQuery";
import { useDarkTheme } from "@/hook/useDarkTheme";
import Contact from "@/component/Contact.vue";
import IconCircle from "@/component/icon/Circle.vue";

export default defineComponent({
  components: {
    Contact,
    IconCircle,
  },
  setup() {
    const content = ref(document.createElement("div"));
    const doodleControl = useDoodle();
    const isCircleActive = ref(false);
    const { isDark } = useDarkTheme();

    if (isDark.value) {
      const doodle = document.querySelector("css-doodle") as HTMLElement;
      doodle?.style.setProperty("--background", "#001219");
    }

    const { matches: reduceMotion } = useScreenQuery(
      "(prefers-reduced-motion)"
    );

    return {
      content,
      reduceMotion,
      isCircleActive,
      ...doodleControl,
    };
  },
});
</script>

<template>
  <main
    ref="content"
    class="content"
    itemscope
    itemtype="https://schema.org/Person"
  >
    <header>
      <button
        class="non-button"
        :class="{ 'non-button--disabled': isBackgroundActive }"
        type="button"
        :disabled="isBackgroundActive"
        aria-label="change background"
        @click="toggleBackgroundDoodle()"
        @mouseenter="isCircleActive = true"
        @mouseleave="!isBackgroundActive && (isCircleActive = false)"
      >
        <svg
          class="non-button-text"
          :class="{
            'non-button-text--active': isCircleActive || isBackgroundActive,
          }"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          style="enable-background: new 0 0 100 100"
          xml:space="preserve"
        >
          <polygon
            points="30,70.3 70,54.3 70,45.7 30,29.7 30,38.3 59.2,50 30,61.7  "
          ></polygon>
        </svg>
        <icon-circle
          :isActive="isCircleActive || isBackgroundActive"
          class="non-button-circle"
        />
      </button>
      <h1 itemprop="name">Bento</h1>
      <h2 itemprop="jobTitle">Frontend Developer</h2>
    </header>
    <contact />
  </main>

  <transition name="fade">
    <button
      aria-live="polite"
      aria-label="change background"
      tabindex="-1"
      key="poster"
      v-if="!isBackgroundActive"
      class="doodle-wrapper"
      @click="toggleBackgroundDoodle()"
    >
      <css-doodle
        @mouseenter="!reduceMotion && updateDoodle()"
        @mouseleave="clearDoodle"
        class="doodle"
        ref="doodle"
      >
        <pre>
          :doodle {
            @grid: 8 / 90%;
            @shape: circle;
          }
          border-radius: @pick(100% 0, 0 100%);
          transform: scale(@r(.25, 1.25));
          background: hsla(calc(240 - 6 * @x * @y), 70%, 68%, @r.8 );
          transition: {{ reduceMotion ? 0 : ".4s @r(.6s)" }} ;
        </pre>
      </css-doodle>
    </button>
  </transition>
</template>

<style lang="scss">
@use "@/style/mixin/_color-scheme.scss" as *;

html,
body {
  background: $rich;
  min-height: max-content;
}

#app {
  font-family: $overpass;
  min-height: max-content;
  height: 100vh;
  padding: 3rem;
  line-height: 1.4;

  @include color-scheme;
}
</style>

<style lang="scss" scoped>
@use "@/style/mixin/_fluid.scss" as *;
@use "@/style/mixin/_neu.scss" as *;
@use "@/style/mixin/_color-scheme.scss" as *;

.non-button {
  padding: 0;
  position: relative;
  color: inherit;
  cursor: pointer;
  height: 32px;
  width: 32px;
  margin-left: -0.5rem;
  border-radius: 50%;

  &--disabled {
    cursor: initial;
  }

  &-text {
    transition: transform 0.25s 0.25s ease-in-out;

    &--active {
      transform: rotate(-90deg);
    }
  }

  &-circle {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;

    &::before {
      z-index: 0;
      content: "";
      display: inline-block;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      @include neu(0.5rem, 1.5rem);
      @include color-scheme;
    }
  }
}

.content {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 1;
  padding: 2rem;
  border-radius: 1rem;
  width: max-content;
  @include neu;

  @media screen and (min-width: 768px) {
    gap: 5rem;
    margin: 6rem;
    flex-direction: row;
    max-width: max-content;
    align-items: flex-end;
  }

  @media screen and (orientation: landscape) and (max-width: 768px) {
    gap: 5rem;
    flex-direction: row;
    height: max-content;
    width: max-content;
    align-items: flex-start;
  }

  &--dark {
    background: linear-gradient(145deg, #00131b, #001017);
    box-shadow: 1rem 1rem 2rem #000a0e, -1rem -1rem 2rem #001a24;
    color: $champagne;
  }
}

.doodle-wrapper {
  background: transparent;
  border: none;
}

.doodle {
  position: fixed;
  top: -5rem;
  right: -5rem;
  height: 350px;
  width: 350px;
  display: flex;
  background: transparent;
  cursor: pointer;
  border: 0;
  border-radius: 50%;
  overflow: hidden;
  opacity: 0.7;

  &:hover {
    filter: hue-rotate(-1.142rad);
    transition: filter 0.25s ease-in-out;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
