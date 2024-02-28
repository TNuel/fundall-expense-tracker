<template>
  <div class="min-h-screen bg-tertiary p-6 lg:px-8 lg:py-10">
    <div class="bg-white rounded-[40px] max-w-md mx-auto lg:max-w-full shadow-lg h-full p-3 lg:p-10 w-full">
      <header class="flex justify-between items-center mb-5 px-4 lg:px-12">
        <img src="../assets/images/FundAllLogo.svg" alt="FundAll Logo" />
        <div class="flex gap-x-2 w-[12rem]">
          <ButtonComponent text="Log In" variant="outline" @click="handleRouteToLoginPage" />
          <ButtonComponent text="Sign Up" variant="solid" @click="handleRouteToRegisterPage" />
        </div>
      </header>
      <main>
        <IllustrationComponent class="mb-16 lg:mb-20"/>
        <h1 class="font-bold text-center my-4 font-circular text-[32px] lg:text-[40px] leading-[51px] tracking-normal">
          Fundall Expense Tracker
        </h1>
        <p class=" font-thin text-center mb-16 lg:mb-20 font-circular text-[32px] lg:text-[40px] leading-[51px] tracking-normal">Mini Project Frontend</p>
        <p class="font-bold text-center font-circular text-[18px] lg:text-[24px] leading-[51px] tracking-normal mb-16 lg:mb-24">by Emmanuel Tolani</p>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import ButtonComponent from "../components/utils/buttons/ButtonComponent.vue";
import IllustrationComponent from "../components/utils/illustrators/IllustrationComponent.vue";

const router = useRouter();

// function to route to login page
const handleRouteToLoginPage = () => {
  console.log('routing to login page ........')
  router.push("/login")
};

// function to route to signup page
const handleRouteToRegisterPage = () => {
  console.log('routing to signup page ........')
  router.push("/register")
};
</script>
