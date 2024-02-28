<template>
  <div class="mb-4">
    <select
      v-model="selectedValue"
      @change="updateValue"
      class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option disabled value="">Please select one</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  value: String,
  options: Array,
});

const selectedValue = ref(props.value);

const updateValue = () => {
  emit("update:modelValue", selectedValue.value);
};

watchEffect(() => {
  selectedValue.value = props.value;
});
</script>
