import { api } from './api';

class services {
    async healthCheck() {
        try {
            const response = await api.get('/health');
            return response.data.status === 'ok';
        } catch (error) {
            console.error('Health check failed:', error);
            throw error;
        }
    }

    async dbHealthCheck() {
        try {
            const response = await api.get('/db-health');
            return response.data.status === 'ok';
        } catch (error) {
            console.error('Database health check failed:', error);
            throw error;
        }
    }

    async getInjectable(params) {
        try {
            console.log("params: ", params);
            const response = await api.get('/playground/injectable', { params });
            return response;
        } catch (error) {
            console.error('Error getting injectable results:', error);
            throw error;
        }
    }

    async getNonInjectable(params) {
        try {
            const response = await api.get('/playground/non-injectable', { params });
            return response;
        } catch (error) {
            console.error('Error getting non-injectable results:', error);
            throw error;
        }
    }
}

export const apiService = new services(); 
