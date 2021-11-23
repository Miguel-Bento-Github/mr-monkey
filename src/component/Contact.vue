<script lang="ts">
import { defineComponent } from "vue";
import IconEmail from "./icon/Email.vue";
import IconGithub from "./icon/Github.vue";
import IconLinked from "./icon/Linked.vue";

export default defineComponent({
  components: { IconLinked, IconGithub, IconEmail },
});
</script>

<template>
  <address itemprop="contactPoint" class="contact">
    <h2 class="contact-header">Contact</h2>
    <a
      target="_blank"
      class="icon-wrapper icon-email"
      tabindex="0"
      href="mailto:bento-miguel@outlook.com"
      itemprop="email"
    >
      <icon-email class="icon" aria-label="email icon" />
    </a>
    <a
      target="_blank"
      class="icon-wrapper icon-github"
      tabindex="0"
      href="https://github.com/Miguel-Bento-Github"
      itemprop="url"
    >
      <icon-github class="icon" aria-label="github icon" />
    </a>

    <a
      target="_blank"
      class="icon-wrapper icon-linked"
      tabindex="0"
      href="https://www.linkedin.com/in/miguel-angelo-bento/"
      itemprop="url"
    >
      <icon-linked class="icon" aria-label="linkedIn icon" />
    </a>
  </address>
</template>

<style lang="scss" scoped>
@use "@/style/mixin/_color-scheme.scss" as *;
@use "@/style/mixin/_neu.scss" as *;

.contact {
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: 768px) {
    gap: 1rem;
    width: initial;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

.contact-header {
  display: none;
}

.icon {
  position: relative;
}

.icon-wrapper {
  position: relative;
  @include color-scheme;
  height: 48px;
  width: 48px;
  padding: 0.25rem;
  border: 2px currentColor solid;
  border-radius: 50%;
  transform: scale(0.95);
  transition: transform 0.1s ease-in-out;

  &::before {
    z-index: 0;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    @include color-scheme;
    @include neu(0.5rem, 1.5rem);
  }

  &:hover {
    transition: transform 0.15s ease;
    transform: scale(1);
  }

  @media screen and (max-width: 768px) {
    position: fixed;

    &:nth-child(4) {
      bottom: 3rem;
      left: 3rem;
    }

    &:nth-child(3) {
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
    }

    &:nth-child(2) {
      bottom: 3rem;
      right: 3rem;
    }
  }
}
</style>
