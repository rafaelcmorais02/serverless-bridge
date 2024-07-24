import axios, { AxiosInstance } from 'axios';

class Api {
    private apiRequest: AxiosInstance;
    constructor() {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const apiKey = import.meta.env.VITE_API_KEY;
        const headers = {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
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

    public async postTest<T>(data: string): Promise<T> {
        const response = await this.apiRequest.post<T>('test/', { data });
        return response.data;
    }
}

export default Api;
