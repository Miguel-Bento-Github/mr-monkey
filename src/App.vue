<script lang="ts">
import { defineComponent, ref } from "vue";
import Github from "@/component/icon/Github.vue";
import LinkedIn from "@/component/icon/Linked.vue";
import "css-doodle";
import { useDoodle } from "@/hook/useDoodle";
import Lang from "@/asset/Lang.vue";
import Speak from "@/asset/Speak.vue";

const voice = new SpeechSynthesisUtterance().voice;
type Voice = typeof voice;

export default defineComponent({
  components: {
    Github,
    LinkedIn,
    Lang,
    Speak,
  },
  setup() {
    const doodleControl = useDoodle();
    const voice = speechSynthesis;
    const voices = ref<Voice[]>([]);
    const langs = ref<string>(new Set());
    const speakers = ref([]);
    const activeVoice = ref<Voice>(null);
    const activeLang = ref("");
    const showLangs = ref(false);
    const content = ref(document.createElement("div"));
    const speaker = ref(new SpeechSynthesisUtterance());

    const readme = <K extends HTMLElement>({ target }: Record<string, K>) => {
      speaker.value = new SpeechSynthesisUtterance(target.innerText);
      speaker.value.voice = activeVoice.value;
      speaker.value.lang = activeLang.value;

      if (voice.speaking) voice.cancel();

      voice.speak(speaker.value);
    };

    const toggleBackgroundContent = () => {
      console.log("hi");
    };

    const openLangs = () => {
      voices.value = voice.getVoices();
      const uniqueVoices = new Set();
      voices.value.forEach((synth) => {
        uniqueVoices.add(synth?.lang);
      });

      langs.value = uniqueVoices;
    };

    const toggleLangs = () => {
      if (!showLangs.value) {
        openLangs();
      }

      showLangs.value = !showLangs.value;
    };

    const closeLangs = () => (showLangs.value = false);

    const selectLang = (lang: string) => {
      activeLang.value = lang;
      toggleLangs();
    };

    return {
      ...doodleControl,
      readme,
      content,
      toggleBackgroundContent,
      showLangs,
      toggleLangs,
      selectLang,
      closeLangs,
      langs,
    };
  },
});
</script>

<template>
  <Speak class="icon speech-selector" v-if="false" />
  <section @keydown.esc="closeLangs">
    <button type="button" class="lang-select" @click="toggleLangs">
      <Lang class="icon lang-selector" />
    </button>

    <ul class="language-options" v-show="showLangs">
      <li v-for="lang in langs" :key="lang">
        <button
          key
          class="language-option"
          @click="selectLang(lang)"
          type="button"
        >
          {{ lang }}
        </button>
      </li>
    </ul>
  </section>

  <main
    ref="content"
    class="content"
    itemscope
    itemtype="https://schema.org/Person"
  >
    <pre aria-disabled="true">></pre>
    <header>
      <h1 tabindex="0" @focus="readme" itemprop="name">Bento</h1>
    </header>

    <section>
      <h2 tabindex="0" @focus="readme" itemprop="jobTitle">
        Frontend Developer
      </h2>
    </section>

    <section itemprop="contactPoint" class="contact">
      <h2 class="contact__header">Contact</h2>
      <a
        @focus="readme"
        tabindex="0"
        href="mailto:bento-miguel@outlook.com"
        itemprop="email"
        >bento-miguel@outlook.com</a
      >

      <figure>
        <a
          @focus="readme"
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
          @focus="readme"
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
    <css-doodle key="background" v-if="isBackgroundActive" class="background">
      <pre>
        :doodle {
          @grid: 20 / 100vmax;
          background: #001219;
          font-family: sans-serif;
          overflow: hidden;
        }
        :after {
          content: \@hex.@r(0x2500, 0x257f);
          color: hsla(@r360, 40%, 70%, @r.9);
          font-size: 8vmin;
        }
      </pre>
    </css-doodle>

    <button
      aria-live="polite"
      tabindex="0"
      key="poster"
      v-else
      class="doodle-wrapper"
      @click="
        toggleBackgroundDoodle();
        toggleBackgroundContent();
      "
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
          transition: .4s @r(.6s);
          border-radius: @pick(100% 0, 0 100%);
          transform: scale(@r(.25, 1.25));
          background: hsla(calc(240 - 6 * @x * @y), 70%, 68%, @r.8 );
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
.background,
.doodle-wrapper {
  transition: all 0.2s ease-out;
}

.background {
  z-index: 0;
  position: fixed;
  top: 0;
  left: 0;
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
