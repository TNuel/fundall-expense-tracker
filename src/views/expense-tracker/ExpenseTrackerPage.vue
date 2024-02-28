<template>
  <div class="min-h-screen bg-tertiary  md:p-6 lg:px-10 lg:py-16">
    <div
      class="grid grid-cols-1 md:grid-cols-5 bg-[#FCFBFC] gap-x-6 px-6 md:px-10 lg:px-16 py-8 md:rounded-[40px]"
    >
      <div class="col-span-2 md:mr-12 my-6 md:my-0">
        <header class="">
          <img
            src="../../assets/images/FundAllLogo.svg"
            class=""
            alt="FundAll Logo"
          />
        </header>
        <div
          class=""
        >
          <main class="">
            <div class="flex space-x-6 my-10">
              <div class="flex justify-center items-center rounded-xl w-20 h-20 bg-[#c4c4c4]">
                <img :src="userDetails.avatar" alt="user icon" v-if="userDetails.avatar"/>
                <img v-else src="../../assets/images/User.svg" alt="user icon">
              </div>
              <div>
                <h1
                  class="font-bold text-left font-circular text-[28px] leading-[51px] tracking-wider"
                >
                {{ userDetails.firstname }} {{ userDetails.lastname }}
                </h1>
                <p
                  class="font-thin text-left font-circular text-[21px] leading-[26.56px] tracking-normal"
                >
                {{ userDetails.email }}
                </p>
              </div>
            </div>
            <div>
                <p
                class="font-thin text-left font-circular text-[21px] leading-[26.56px] tracking-normal"
                >
                Target Monthly Expenses.
              </p>
              <h1
                class="font-bold text-left font-circular text-[28px] leading-[35.42px] tracking-wider"
              >
                ₦{{ userDetails.income ? userDetails.income : 0.00 }}
              </h1>
              <!-- Progress Bar -->
              <div class="bg-tertiary shadow-md mt-10 rounded-lg overflow-hidden max-w-full">
                <ProgressBar :totalExpense="parseFloat(userDetails.total_balance)" :actualExpense="parseFloat(userDetails.spent)" />
              </div>
            </div>
            <div
          class="bg-white shadow-lg rounded-lg mt-10 h-80 px-6 py-3"
        >
          
          <p
            class="text-left font-semibold text-textColor text-[14px] leading-[11.17px] font-circular "
          >
          Daily Expenses Summary
          </p>
          <table class="w-full mb-8">
            <thead>
              <tr class="text-center">
                <th class=""></th>
                <th class="py-2">Date</th>
                <th class="py-2">Amount</th>
              </tr>
            </thead>
            <tbody v-if="expenses.length > 1 && expenses">
              <template v-for="expense in expenses" :key="expense.id">
                  <tr class="border-b-[0.5px] px-3 border-[#e3ece5]/50">
                    <td class="py-4 text-center">
                      <div class="bg-secondary w-[12px] h-[12px] rounded-full inline-block mr-2"></div>
                    </td>
                    <td class="capitalize text-center py-4">{{ new Date(expense.date).toDateString() }}</td>
                    <td class="text-center py-4 text-secondary">₦{{  expense.price }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
            <template v-if="expenses.length < 1" >
              <div class="flex justify-center items-center mx-auto w-full">
                <ArtworkIllustrationComponent />
              </div>
            </template>
          <!-- Pagination component -->
          <PaginationComponent :total-pages="totalPages" @page-changed="onPageChanged" v-if="expenses.length > 1" />
        </div>
          </main>
        </div>
      </div>
      <div class="p-6 bg-[#f2f3f7] flex flex-col space-y-6 rounded-2xl w-full h-full  col-span-3">
        <div
          class="bg-white w-full p-6 relative shadow-lg rounded-lg flex justify-between"
        >
          <div class="mt-4">
            <h1
              class="font-bold text-left font-circular text-[22px]] leading-[27.56px] tracking-wider"
            >
              <span class="text-secondary">Welcome Back,</span> {{ userDetails.firstname }}
            </h1>
            <p
              class="font-thin text-left font-nunito text-[15px] leading-[26.56px] tracking-normal"
            >
              Now, let’s get your expenses for this month
            </p>

          </div>
          <div class="relative">
            <div class="hidden md:block absolute -bottom-7 right-3 lg:scale-100 md:scale-80 scale-60">
              <WelcomeIllustrationComponent />
            </div>
          </div>
        </div>
        <div class="w-2/3 p-3 space-y-3 px-4 lg:px-10">
          <h1 class="font-thin text-left font-nunito text-[15px] leading-[26.56px] tracking-normal">Target Monthly Expenses</h1>
          <TextInput inputId="targetMontlyExpenses" placeholder="Enter Amount" v-model="formData.targetMontlyExpenses" />
          <h1 class="font-thin text-left font-nunito text-[15px] leading-[26.56px] tracking-normal">Date</h1>
              <!-- <TextInput inputType="date" inputId="date" placeholder="Select Date" v-model="formData.date" /> -->
              <!-- <VCalendar v-model='selectedDate' /> -->
              <!-- <VDatePicker  /> -->
              <DatePicker @update:selectedDate="handleSelectedDate" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-x-6 lg:px-10">
              <div class="col-span-3 space-y-4">
                <h1 class="font-thin text-left font-nunito text-[15px] leading-[26.56px] tracking-normal">Today's Expenses</h1>
                <TextInput inputId="enterItem1" placeholder="Enter Item" v-model="formData.enterItem1" />
                <TextInput inputId="enterItem2" placeholder="Enter Item" v-model="formData.enterItem2" />
                <TextInput inputId="enterItem3" placeholder="Enter Item" v-model="formData.enterItem3" />
              </div>
              <div class="md:col-span-2 col-span-3 mt-9 space-y-4">
                <TextInput inputId="enterAmount1" placeholder="Enter Amount" v-model="formData.enterAmount1" />
                <TextInput inputId="enterAmount2" placeholder="Enter Amount" v-model="formData.enterAmount2" />
                <TextInput inputId="enterAmount3" placeholder="Enter Amount" v-model="formData.enterAmount3" />
              </div>

            </div>
            <div class="flex flex-col md:flex-row justify-end items-center md:px-10">
              <p class="font-thin text-left font-circular text-[16px] leading-[26.24px] mt-2 mr-2 tracking-normal">Total Actual Expenses: ₦ 
              </p>
                <TextInput inputType="number" inputId="enterAmount3" placeholder="0.00" v-model="totalAmount" />
            </div>
            <div class="max-w-md mx-auto">
              <ButtonComponent text="SAVE TODAY’S EXPENSES" variant="solid" @click="handleRouteToRegisterPage" />
            </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import ButtonComponent from "../../components/utils/buttons/ButtonComponent.vue";
import WelcomeIllustrationComponent from "../../components/utils/illustrators/WelcomeIllustrationComponent.vue";
import ArtworkIllustrationComponent from "../../components/utils/illustrators/ArtworkIllustrationComponent.vue";
import TextInput from "../../components/utils/inputs/TextInput.vue";
import DatePicker from "../../components/utils/inputs/DatePicker.vue";
import ProgressBar from "../../components/ProgressBar.vue"
import PaginationComponent from "../../components/PaginationComponent.vue";
import { useUserStore } from "../../stores/user";
import expensesData from "../../composables/expenses-data"

const userStore = useUserStore()
const userDetails = ref({});
const formData = ref({
  targetMontlyExpenses: "",
  date: "",
  enterItem1: "",
  enterItem2: "",
  enterItem3: "",
  enterAmount1: "",
  enterAmount2: "",
  enterAmount3: "",
});

const imageUrl = ref('');

const totalAmount = computed(() => {
  return (parseFloat(formData.value.enterAmount1) || 0) + (parseFloat(formData.value.enterAmount2) || 0) + (parseFloat(formData.value.enterAmount3) || 0);
});

const selectedDate = ref('');

const handleSelectedDate = (newValue) => {
  console.log('something for date ==>', newValue);
  selectedDate.value = newValue.toDateString();
};

const totalPages = ref(10);

const expensesArray = expensesData;
console.log(expensesArray);

const expenses = ref([ ...expensesArray.expenses]);
console.log(expenses.value);

const onPageChanged = (newPage) => {
  console.log('Page changed to:', newPage);
  // Here you would update your data based on the new page number
  // For instance, fetching new data from an API
};

const getUserDetails = async () => {
  try {
    const response = await userStore.getProfile();
    console.log(response);
    formData.value.targetMontlyExpenses = response.data.success.data.income
    imageUrl.value = userDetails.value.avatar
    userDetails.value = response.data.success.data;
    console.log(userDetails.value);

  } catch(error) {
    console.log(error)
  }
};

onMounted(() => {
  getUserDetails();
})
</script>

<style scoped>
a:active {
  color: aquamarine;
}
</style>
