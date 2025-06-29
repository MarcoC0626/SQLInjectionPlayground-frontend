import { action, extendObservable, observable } from 'mobx';
import { apiService } from '../../services';

class SQLInjectionStore {

    constructor() {
        extendObservable(this, {
            result: null,
            loading: false,
            error: null,
            username: ''
        });
    }

    setUsername(username) {
        this.username = username;
    }

    setResult(result) {
        this.result = result;
    }

    setLoading(loading) {
        this.loading = loading;
    }

    setError(error) {
        this.error = error;
    }

    async checkBackendConnection() {
        try {
            await apiService.healthCheck();
            return true;
        } catch (error) {
            return false;
        }
    }

    async checkDatabaseConnection() {
        try {
            await apiService.dbHealthCheck();
            return true;
        } catch (error) {
            return false;
        }
    }

    async testInjectable() {
        this.setLoading(true);
        this.setError(null);
        try {
            console.log("username: ", this.username);
            const response = await apiService.getInjectable({ string: this.username });
            this.setResult(response.data);
        } catch (error) {
            this.setError(error.response?.data?.error || error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async testNonInjectable() {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await apiService.getNonInjectable({ string: this.username });
            this.setResult(response.data);
        } catch (error) {
            this.setError(error.response?.data?.error || error.message);
        } finally {
            this.setLoading(false);
        }
    }
}

export default new SQLInjectionStore(); 