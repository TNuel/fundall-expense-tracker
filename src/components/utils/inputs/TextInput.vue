<template>
  <div class="relative">
    <label :class="{'text-secondary': isActive}" :for="inputId" class="block  text-normal text-[16px] font-circular font-thin mb-2">
      {{ label }}
    </label>
    <input 
      :id="inputId"
      :value="modelValue" 
      :type="inputType"
      @input="$event => emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder" 
      class="appearance-none border rounded w-full p-3 text-textColor leading-tight font-circular focus:outline-none " 
      :class="{'border-secondary': isActive, 'focus:border-textColor': !isActive}"
      @focus="isActive = true" 
      @blur="isActive = false" 
    >
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: String,
  label: String,
  inputId: String,
  inputType: { 
    type: String,
    default: 'text' // Default to 'text' if not provided
  }
});

const inputValue = ref(props.value);
const isActive = ref(false);


const emit = defineEmits(['update:modelValue'])

watchEffect(() => {
  inputValue.value = props.value;
});
</script>

