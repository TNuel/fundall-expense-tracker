import { defineStore } from 'pinia'
import axios from "axios";

export const useExpenseStore = defineStore('expenseStore',
    {
        state: () => {
            return {
                allExpenses: localStorage.getItem('allExpenses') || [],
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
            setActiveLayers(expenses) {
                this.allExpenses = expenses
            },
            setAgentLocations(agentLocations) {
                this.agentLocations = agentLocations
            },
            async getAllExpenses(agentId, fromDate, toDate) {
                if(fromDate && toDate){
                    let url = `&from_date=${fromDate}T00:00:00&to_date=${toDate}T23:59:59`
                    const response = await axios.get(
                        `/collection?acct_officer_id=${agentId}${url}`
                        )
                        console.log(response);
                        console.log('store response =>', response);
                        const result = response.data.data;
                        localStorage.setItem('collections', result)
                        return result;
                    } else {
                        // Get the current date in ISO format (YYYY-MM-DD)
                        const currentDate = new Date().toISOString().split('T')[0];
                        console.log(currentDate);
                        // Construct the query for today
                        const url = `&from_date=${currentDate}T00:00:00&to_date=${currentDate}T23:59:59`;
                        
                        const response = await axios.get(`/collection?acct_officer_id=${agentId}${url}`);
                        
                        console.log('Default query for today:', response);
                        
                        const result = response.data.data;
                        localStorage.setItem('collections', JSON.stringify(result)); // Store as JSON string
                        return result;

                }
            },
            async getAgentCustomers(agentId) {

                const response = await axios.get(
                    `/customer/all?acct_officer_id=${agentId}`
                    )
                console.log(response);
                console.log('store response =>', response);
                const result = response.data.data;
                localStorage.setItem('customers', result)
                return result;


            },
            async getAgentLocations(agentId) {

                const response = await axios.get(
                    `/agent/location/all?agent_id=${agentId}&limit=1&offset=0`
                    )
                console.log(response);
                console.log('store response =>', response);
                const result = response.data.data;
                localStorage.setItem('agentLocations', result)
                return result;


            },
        },

    })
