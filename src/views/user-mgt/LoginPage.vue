<template>
  <div class="min-h-screen bg-tertiary p-6 lg:px-10 lg:py-16">
    <div
      class="grid grid-cols-1 md:grid-cols-2 bg-[#FCFBFC] p-10 rounded-[40px]"
    >
      <div>
        <header class="">
          <img
            src="../../assets/images/FundAllLogo.svg"
            class=""
            alt="FundAll Logo"
          />
        </header>
        <div
          class="max-w-md hidden md:flex justify-center items-center mx-auto"
        >
          <main class="mt-40">
            <LoginIllustrationComponent class="mb-16 lg:mb-20 scale-90" />
            <h1
              class="font-bold text-left m-4 font-circular text-[32px] lg:text-[40px] leading-[51px] tracking-wider"
            >
              <span class="text-secondary">Welcome back! </span> <br />We miss
              you.
            </h1>
            <!-- <p class=" font-thin text-center mb-16 lg:mb-20 font-circular text-[32px] lg:text-[40px] leading-[51px] tracking-normal">Mini Project Frontend</p> -->
            <p
              class="font-thin hidden text-left mx-4 font-circular text-[21px] leading-[26.56px] tracking-normal"
            >
              Your first step toward a better financial lifestyle starts here.
            </p>
          </main>
        </div>
      </div>
      <div class="">
        <div
          class="bg-white my-10 shadow-lg rounded p-10 lg:px-20 py-12 mb-20 flex flex-col space-y-8 lg:mr-20"
        >
          <!-- Login form -->
          <form @submit.prevent="handleSubmit" class="w-full space-y-8">
            <div
              v-if="err"
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span class="block sm:inline">{{ err }}</span>
            </div>

            <div
              v-if="success"
              class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span class="block sm:inline">{{ success }}</span>
            </div>
            <div>
              <h1
                class="font-bold text-left font-circular text-[32px] lg:text-[40px] leading-[51px] tracking-wider"
              >
                Holla
              </h1>
              <p
                class="font-thin text-left mt-6 font-circular text-[20px] leading-[25.3px] tracking-wide text-textColor"
              >
                Sign in to the vibe!
              </p>
            </div>
            <TextInput
              label="Email or Username"
              inputId="email"
              placeholder="Enter Email"
              v-model="formData.email"
            />
            <TextInput
              label="Password"
              inputId="password"
              inputType="password"
              placeholder="Enter Password"
              v-model="formData.password"
            />
            <span
              class="text-red-400 font-nunito text-sm my-2"
              v-if="message"
              >{{ message }}</span
            >
            <ButtonComponent
              text="LOGIN"
              variant="solid-long"
              :buttonDisabled="btnDisable"
            />
          </form>
          <div class="flex flex-col space-y-6">
            <p
              class="text-center font-semibold text-textColor font-nunito text-base leading-6 align-center max-w-sm mx-auto"
            >
              Don't have an account?
              <router-link to="/register" class="text-secondary"
                >Register Here</router-link
              >
            </p>
            <p
              class="text-center font-semibold text-[#97A19D] font-nunito text-base leading-6 align-center max-w-sm mx-auto"
            >
              By clicking on Login, you agree to our
              <a href="#" class="text-secondary"
                >Terms & Conditions and Privacy Policy</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import ButtonComponent from "../../components/utils/buttons/ButtonComponent.vue";
import LoginIllustrationComponent from "../../components/utils/illustrators/LoginIllustrationComponent.vue";
import TextInput from "../../components/utils/inputs/TextInput.vue";

const router = useRouter();
const authStore = useAuthStore();
const err = ref("");
const success = ref("");
const message = ref("");
const btnDisable = ref(false);
const formData = ref({
  email: "",
  password: "",
});

//  Function to handle login request
const handleSubmit = async () => {
  btnDisable.value = true;
  const loginData = {
    email: formData.value.email,
    password: formData.value.password,
  };

  // validating email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    // alert("Please enter a valid email address");
    message.value = "Please enter a valid email address";
    return setTimeout(() => {
      btnDisable.value = false;
      message.value = "";
    }, 3000);
  }

  // validating password length
  if (formData.value.password.length <= 4) {
    message.value = "Passwords should be more than  4 characters.";
    btnDisable.value = false;
    return;
  }

  console.log(loginData);
  try {
    message.value = '';
    const response = await authStore.login(loginData);
    console.log("login response =>", response);
    const userData =  response.data.success.user;
    console.log(userData);
    localStorage.setItem('user', JSON.stringify(userData))
    success.value = `You've signed in Successful!.`;
    formData.value = {
        email: "",
        password: "",
    }
    setTimeout(()=>{
        success.value = '';
        router.push('/fund-all/expense-trancker');
    }, 5000);
  } catch (error) {
    btnDisable.value=false;
    if(error.response){
        err.value = error.response.data.error.message ? error.response.data.error.message : 'Invalid Credentials';
        setTimeout(() => {
            err.value = "";
        }, 5000);
      } else {
      err.value = 'Something went wrong, plaese try again';
      setTimeout(() => {
          err.value = "";
      }, 5000);
    }
    console.log("login error ==>", error);
  }
};

onMounted(() => {
  localStorage.clear();
})
</script>

<style scoped>
a:active {
  color: aquamarine;
}
</style>
