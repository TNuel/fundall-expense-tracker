import axios from "axios";
import { useRouter } from "vue-router";


const router = useRouter();
// const baseUrl = import.meta.env.VITE_HOST_NAME;
const baseUrl = import.meta.env.VITE_BASE_URL;
console.log(baseUrl);
axios.defaults.baseURL = baseUrl;

const accessToken = localStorage.getItem("token");
const type = localStorage.getItem("tokenType");

console.log('type and access token ==>', type);
console.log('type and access token ==>', accessToken);

axios.defaults.headers.common["Authorization"] = `${type} ${accessToken}`;
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    console.log(error.response.data);
    if (error.response.status === 401) {
      router.push("/");
    }
    return Promise.reject(error);
  }
);
