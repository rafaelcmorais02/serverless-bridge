import axios, { AxiosInstance } from 'axios';

class Api {
    private apiRequest: AxiosInstance;
    constructor() {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const headers = {
            'Content-Type': 'application/json',
        };
        this.apiRequest = axios.create({
            baseURL: baseUrl,
            headers: headers,
        });
    }

    public async getTest<T>(): Promise<T> {
        const response = await this.apiRequest.get<T>('test/');
        return response.data;
    }
}

export default Api;
