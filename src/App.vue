<script lang="ts">
import { defineComponent, ref } from "vue";
import Github from "@/component/icon/Github.vue";
import LinkedIn from "@/component/icon/Linked.vue";
import "css-doodle";
import { useDoodle } from "@/hook/useDoodle";
import Email from "./component/icon/Email.vue";
import { useScreenQuery } from "./hook/useScreenQuery";

export default defineComponent({
  components: {
    Github,
    LinkedIn,
    Email,
  },
  setup() {
    const content = ref(document.createElement("div"));
    const doodleControl = useDoodle();

    const { matches: isDark } = useScreenQuery("(prefers-color-scheme: dark)");

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
      <pre aria-disabled="true">></pre>
      <h1 itemprop="name">Bento</h1>
      <h2 itemprop="jobTitle">Frontend Developer</h2>
    </header>

    <address itemprop="contactPoint" class="contact">
      <h2 class="contact-header">Contact</h2>
      <a
        class="icon"
        tabindex="0"
        href="mailto:bento-miguel@outlook.com"
        itemprop="email"
      >
        <Email />
      </a>
      <a
        class="icon"
        tabindex="0"
        href="https://github.com/Miguel-Bento-Github"
        itemprop="url"
      >
        <Github aria-label="github" />
      </a>

      <a
        class="icon"
        tabindex="0"
        href="https://www.linkedin.com/in/miguel-angelo-bento/"
        itemprop="url"
      >
        <LinkedIn aria-label="linkedIn" />
      </a>
    </address>
  </main>

  <transition name="fade">
    <button
      aria-live="polite"
      tabindex="0"
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
#app {
  font-family: $overpass;
  background: $rich;
  color: $text;
  height: 100vh;
  padding: 3rem;
  line-height: 1.4;

  @media screen and (prefers-color-scheme: light) {
    background: $text;
    color: $rich;
  }
}
</style>

<style lang="scss" scoped>
.doodle-wrapper {
  transition: all 0.2s ease-out;
}

.language-options {
  background: $rich;
  z-index: 3;
  position: fixed;
  top: 3rem;
  left: 3rem;
}

.language-option {
  border-radius: 1rem;
  box-shadow: 0 0 2px $middle;
  color: inherit;
}

.content {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 1;
  max-width: max-content;
  background: linear-gradient(145deg, #f9e7b2, #d2c295);
  box-shadow: 1rem 1rem 4rem #a59976, -1rem -1rem 4rem #ffffd6;
  color: $rich;
  padding: 2rem;
  border-radius: 1rem;

  @media screen and (prefers-color-scheme: dark) {
    background: linear-gradient(145deg, #00131b, #001017);
    box-shadow: 1rem 1rem 2rem #000a0e, -1rem -1rem 2rem #001a24;
    color: $champagne;
  }

  @media screen and (min-width: 768px) {
    gap: 5rem;
    margin: 6rem;
    flex-direction: row;
    align-items: flex-end;
  }

  &--dark {
    background: linear-gradient(145deg, #00131b, #001017);
    box-shadow: 1rem 1rem 2rem #000a0e, -1rem -1rem 2rem #001a24;
    color: $champagne;
  }
}

.contact {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;

  @media screen and (min-width: 768px) {
    width: initial;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

.contact-header {
  display: none;
}

.icon,
.icon-email {
  transition: transform 0.1s ease;
  border: 2px currentColor solid;
  border-radius: 50%;

  &:hover {
    transition: transform 0.25s ease;
    transform: scale(1.1);
  }
}

.icon {
  height: 56px;
  width: 56px;
  padding: 0.25rem;

  &:nth-child(4) {
    align-self: flex-start;
  }

  &:nth-child(3) {
    align-self: center;
  }

  &:nth-child(2) {
    align-self: flex-end;
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
