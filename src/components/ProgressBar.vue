<template>
  <div class="progress-container">
    <div
      class="progress-bar"
      :style="{ width: progressPercentage + '%' }"
    ></div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  totalExpense: {
    type: Number,
    required: true,
  },
  actualExpense: {
    type: Number,
    required: true,
  },
});

const progressPercentage = computed(() => {
  if (!props.totalExpense || props.totalExpense <= 0) return 0;
  const percentage = (props.actualExpense / props.totalExpense) * 100;
  return percentage > 100 ? 100 : percentage; // Cap the percentage at 100%
});
</script>

<style>
.progress-container {
  width: 100%;
  background-color: #EFEFEF;
  border-radius: 8px;
  overflow: hidden;
}

.progress-bar {
  height: 20px;
  background-color: #4DE897;
  width: 0%; /* Initial width */
  border-radius: 8px;
  transition: width 0.5s ease-in-out;
}
</style>
