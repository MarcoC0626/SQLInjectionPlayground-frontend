import { api } from './api';

class services {
    async getInjectable(params) {
        try {
            console.log("params: ", params);
            const response = await api.get('/playground/injectable', { params });
            return response.data
        } catch (error) {
            console.error('Error getting scanned results:', error);
            throw error;
        }
    }

    async getNonInjectable(params) {
        try {
            const response = await api.get('/playground/non-injectable', { params });
            return response.data
        } catch (error) {
            console.error('Error getting scanned results:', error);
            throw error;
        }
    }
}

export const apiService = new services(); 
