<template>
  <button :class="buttonClasses" :disabled="buttonDisabled">
    {{ text }}
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: String,
  variant: String,
  buttonDisabled: Boolean,
});

const buttonClasses = computed(() => {
  return [
    "px-4 py-2 text-textColor font-circular leading-5 tracking-wide w-full",
    "font-semibold text-sm transition-colors duration-200 uppercase",
    props.variant === "outline"
      ? "hover:border hover:border-secondary hover:bg-secondary/80 hover:text-white"
      : "",
    props.variant === "solid"
      ? "bg-secondary rounded-lg hover:bg-secondary/80"
      : "",
    props.variant === "solid-long"
      ? "bg-secondary rounded font-semibold shadow-shadowColor/30 shadow py-4 disabled:bg-secondary/50 disabled:cursor-not-allowed hover:bg-secondary/80"
      : "",
  ].join(" ");
});
</script>
