<template>
  <div class="flex justify-center items-center space-x-2">
      <span class="p-2 font-nunito"> {{ currentPage }} of {{ totalPages }} </span>
    <button
      v-if="currentPage > 1"
      @click="changePage(currentPage - 1)"
      class="w-5 h-5 bg-secondary/80 rounded-full hover:bg-secondary flex justify-center items-center"
    >
      <span class="text-white cursor-pointer"><img src="../assets/images/left.svg" alt=""></span>
    </button>


    <button
      v-if="currentPage < totalPages"
      @click="changePage(currentPage + 1)"
      class="w-5 h-5 bg-secondary/80 rounded-full hover:bg-secondary flex justify-center items-center"
    >
      <span class="text-white cursor-pointer"><img src="../assets/images/right.svg" alt=""></span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["page-changed"]);

const currentPage = ref(1);

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= props.totalPages) {
    currentPage.value = newPage;
    emits("page-changed", newPage);
  }
};
</script>

<style>
/* Tailwind CSS styles will automatically apply */
</style>
