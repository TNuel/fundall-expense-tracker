import { defineStore } from 'pinia'
import axios from "axios";

export const useUserStore = defineStore('userStore',
    {
        state: () => {
            return {
                userDetails: localStorage.getItem('userDetails') || {},
                collections: localStorage.getItem('collections') || [],
                customers: localStorage.getItem('customers') || [],
                agentLocations: localStorage.getItem('agentLocations') || [],
            }
        },
        actions: {
            setCollections(collections) {
                this.collections = collections;
            },
            setCustomers(customers) {
                this.customers = customers;
            },
            setActiveLayers(userDetails) {
                this.userDetails = userDetails
            },
            setAgentLocations(agentLocations) {
                this.agentLocations = agentLocations
            },
            //  function to get logged in user that
            async getProfile() {
                const response = await axios.get(`base/profile`)
                console.log('get profile response =>',response);

                return response;
          

      },
        },

    })
