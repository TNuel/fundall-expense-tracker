<template>
  <div class="date-picker">
    <TextInput inputId="enterItem3" placeholder="Select Date" v-model="formattedDate" @click="showCalendar = !showCalendar" />
    <div v-if="showCalendar" class="calendar-popup">
        <VDatePicker v-model="date" mode="date" title-position="left" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import TextInput from "./TextInput.vue";

const prop = defineProps({
    selectedDate: String
})

const emits = defineEmits(['update:selectedDate']);
const showCalendar = ref(false);
const date = ref(new Date());

// Computed property to format the selected date for the input display
const formattedDate = computed(() => date.value.toLocaleDateString());

// Watch for changes in the date and emit an event with the new value
watch(date, (newValue) => {
  emits('update:selectedDate', newValue.toISOString());
});

console.log(formattedDate.value);
console.log(date.value);

</script>

<style scoped>
.date-picker {
  position: relative;
  font-family: "Arial", sans-serif;
}

.calendar-popup {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  z-index: 10;
}

/* ... additional styles here to match your design ... */
</style>
