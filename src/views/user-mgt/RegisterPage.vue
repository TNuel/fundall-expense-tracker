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
          <main class="mt-12">
            <IllustrationComponent class="mb-16 lg:mb-20 scale-90" />
            <h1
              class="font-bold text-left m-4 font-circular text-[32px] lg:text-[40px] leading-[51px] tracking-wider"
            >
              <span class="text-secondary">Welcome!</span> Let’s get to know
              you.
            </h1>
            <!-- <p class=" font-thin text-center mb-16 lg:mb-20 font-circular text-[32px] lg:text-[40px] leading-[51px] tracking-normal">Mini Project Frontend</p> -->
            <p
              class="font-thin text-left mx-4 font-circular text-[21px] leading-[26.56px] tracking-normal"
            >
              Your first step toward a better financial lifestyle starts here.
            </p>
          </main>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <div
          class="bg-white my-10 shadow-lg rounded p-10 lg:px-20 py-12 flex flex-col space-y-6 lg:mr-20"
        >
          <form @submit.prevent="onSubmitForm" class="space-y-6">
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
            <div class="grid grid-cols-2 gap-x-6">
              <TextInput
                label="First Name"
                inputId="firstName"
                placeholder="Enter First Name"
                v-model="formData.firstName"
              />
              <TextInput
                label="Last Name"
                inputId="lastName"
                placeholder="Enter Last Name"
                v-model="formData.lastName"
              />
            </div>
            <TextInput
              label="Email"
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
            <TextInput
              label="Confirm Password"
              inputType="password"
              inputId="confirmPassword"
              placeholder="Confirm Password"
              v-model="formData.confirmPassword"
            />
            <span class="text-red-400 font-nunito text-sm my-2" v-if="message">{{ message }}</span>
            <ButtonComponent
                :buttonDisabled="btnDisable"
              text="SIGN UP"
              variant="solid-long"
            />
          </form>
          <p
            class="text-center font-semibold text-textColor font-nunito text-base leading-6 align-center max-w-sm mx-auto"
          >
            Already have an account?
            <router-link to="/login" class="text-secondary">
              Login Here</router-link
            >
          </p>
        </div>
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
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import ButtonComponent from "../../components/utils/buttons/ButtonComponent.vue";
import IllustrationComponent from "../../components/utils/illustrators/IllustrationComponent.vue";
import TextInput from "../../components/utils/inputs/TextInput.vue";

const router = useRouter();
const authStore = useAuthStore();
const err = ref("");
const success = ref("");
const message = ref("");
const btnDisable = ref(false)
const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// register function, when resgistration is successful, user is route to login
const onSubmitForm = async () => {
    btnDisable.value = true;
  const registerData = {
    firstname: formData.value.firstName,
    lastname: formData.value.lastName,
    email: formData.value.email,
    password: formData.value.password,
    password_confirmation: formData.value.confirmPassword,
  };
  
  // validating firstname to be more than 2 characters
  if (firstName.value.length < 3) {
    btnDisable.value = false;
    message.value = "First name should be 2 characters and above";
    return setTimeout(() => {
      message.value = "";
    }, 3000);
  }

  if (lastName.value.length < 2) {
    btnDisable.value = false;
    message.value = "Last name should be 2 characters and above";
    return setTimeout(() => {
      message.value = "";
    }, 3000);
  }

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
  if(formData.value.password.length <= 4) {
    message.value =  "Passwords should be more than  4 characters.";
    btnDisable.value = false;
    return
  }

  // validating password to match with confirm password 
  if(formData.value.password !== formData.value.confirmPassword) {
    message.value =  "Passwords do not match.";
    btnDisable.value = false;
    return
  }

  console.log(registerData);
  try {
    message.value = '';
    const response = await authStore.register(registerData);
    console.log("register response =>", response);
    success.value = `Registration Successful! Please Login.`;
    formData.value = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
    setTimeout(()=>{
        success.value = '';
        router.push('/login');
    }, 5000);
  } catch (error) {
    btnDisable.value=false;
    if(error.response.data){
        err.value = error.response.data.error.message;
        setTimeout(() => {
            err.value = "";
        }, 5000);
    }
    console.log("register error ==>", error);
  }
};
</script>

<style scoped>
a:active {
  color: aquamarine;
}
</style>
