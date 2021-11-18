<script lang="ts">
import { defineComponent, ref } from "vue";
import Github from "@/component/icon/Github.vue";
import LinkedIn from "@/component/icon/Linked.vue";
import "css-doodle";
import { useDoodle } from "@/hook/useDoodle";

export default defineComponent({
  components: {
    Github,
    LinkedIn,
  },
  setup() {
    const content = ref(document.createElement("div"));
    const doodleControl = useDoodle();

    return {
      content,
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
    <pre aria-disabled="true">></pre>
    <header>
      <h1 itemprop="name">Bento</h1>
    </header>

    <section>
      <h2 itemprop="jobTitle">Frontend Developer</h2>
    </section>

    <section itemprop="contactPoint" class="contact">
      <h2 class="contact__header">Contact</h2>
      <a tabindex="0" href="mailto:bento-miguel@outlook.com" itemprop="email"
        >bento-miguel@outlook.com</a
      >

      <figure>
        <a
          tabindex="0"
          href="https://github.com/Miguel-Bento-Github"
          itemprop="url"
        >
          <figcaption>GitHub</figcaption>
          <Github class="icon" />
        </a>
      </figure>

      <figure>
        <a
          tabindex="0"
          href="https://www.linkedin.com/in/miguel-angelo-bento/"
          itemprop="url"
        >
          <figcaption>LinkedIn</figcaption>
          <LinkedIn class="icon" />
        </a>
      </figure>
    </section>
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
        @mouseenter="updateDoodle"
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
          transition: .4s @r(.6s);
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
  position: relative;
  z-index: 1;
  max-width: max-content;
  background: $champagne;
  color: $rich;
  padding: 2rem;
  border-radius: 1rem;

  &--dark {
    background: $rich;
    color: $champagne;
  }
}

.contact__header {
  display: none;
}

.icon {
  height: 48px;
}

.doodle-wrapper {
  background: transparent;
  border: none;
}

.doodle {
  position: fixed;
  top: 3rem;
  right: 3rem;
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
