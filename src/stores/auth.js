import axios from 'axios';
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth',
    {
        state: () => {
            return {
                id: "",
                user: localStorage.getItem('user') || null,
                token: '',
                errorMessage: '',
                isLoggedIn: false,
                token: localStorage.getItem('token') || null,
                tokenType: localStorage.getItem('tokenType') || "",
            }
        },
        actions: {
            setUsername(id) {
                this.id = id;
            },
            setUser(user) {
                this.user = user
            },
            setIsLoggedIn(isLoggedIn) {
                this.isLoggedIn = isLoggedIn
            },
            setError( message) {
                this.error = message;
            },
            setTokens( accessToken) {
                this.token = accessToken;
            },
            setTokens( type) {
                this.tokenType = type;
            },
          
              clearTokens() {
                this.accessToken = '';
                this.refreshToken = '';
              },

            //   login function  to handle the authentication of users using their username and password
            async login(logindata) {
                    console.log(logindata);
                      const response = await axios.post(`login`, logindata)
                      console.log('store response =>',response);
                      const userData =  response.data.success.user;
                      const authStore = useAuthStore();
                        authStore.setIsLoggedIn(true);
                    //   setIsLoggedIn = true;
                      localStorage.setItem('user', JSON.stringify(userData))
                      const accessToken = response.data.success.user.access_token;
                      const type = response.data.success.user.token_type;
                      localStorage.setItem('token', accessToken)
                      localStorage.setItem('tokenType', type)
                      // Setting token for axios header
                      axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
                      
                      console.log('store response =>',accessToken);
      
                      return response;
                

            },

            // User registration 
            async register(credentials) {

                console.log('payload => ', credentials);
                const response = await axios.post(`register`, credentials)
                console.log('store response =>',response);
                return response;
                
            },

            // log user out and clear store and local storage
            logout() {
                console.log('log user out completely and clear data');
                this.token = null;
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setIsLoggedIn = false;
                this.clearTokens();
            },
        },
        
    })
