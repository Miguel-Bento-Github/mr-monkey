<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isActive: Boolean,
  },
});
</script>

<template>
  <svg
    class="svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <circle
      fill="none"
      stroke-width="2px"
      stroke="currentColor"
      stroke-dasharray="88px"
      stroke-dashoffset="88px"
      class="circle"
      :class="{ 'circle--active': isActive }"
      r="14"
      cx="16"
      cy="16"
    />
  </svg>
</template>

<style lang="scss" scoped>
.circle {
  transition: stroke-dashoffset 0.25s ease;

  &--active {
    stroke-dashoffset: 0;
  }
}
</style>
