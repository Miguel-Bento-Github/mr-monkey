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
      class="icon"
      tabindex="0"
      href="mailto:bento-miguel@outlook.com"
      itemprop="email"
    >
      <icon-email />
    </a>
    <a
      class="icon"
      tabindex="0"
      href="https://github.com/Miguel-Bento-Github"
      itemprop="url"
    >
      <icon-github aria-label="github" />
    </a>

    <a
      class="icon"
      tabindex="0"
      href="https://www.linkedin.com/in/miguel-angelo-bento/"
      itemprop="url"
    >
      <icon-linked aria-label="linkedIn" />
    </a>
  </address>
</template>

<style lang="scss" scoped>
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
  height: 48px;
  width: 48px;
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
</style>
