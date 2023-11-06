import axios from "axios";
import {toast} from "react-toastify";

export class BaseRepository {
    constructor(path) {
        this.baseURL = "https://test-api-602w.onrender.com/";
        this.base = axios.create({
            baseURL: this.baseURL + path,
        });
        this.base.defaults.timeout = 30000;
        this.base.interceptors.request.use((config) => {
            config.headers["Authorization"] = "Bearer ";
            return config;
        });
    }

    async checkSupabaseError(response) {
        if (response.error) {
            toast.error(response.error.message);
            return null
        }
        return response.data;
    }

    async checkError(response) {
        console.log(response.status);
        if (response.code >= 400 && response.code < 600) {
            toast.error(response.status);
            return null
        }
        return response.result;
    }

    async get(url, config) {
        const response = await this.base.get(url, config);
        return response.data;
    }

    async post(url, data, config) {
        const response = await this.base.post(url, data, config);
        return response.data;
    }

    async put(url, data, config) {
        const response = await this.base.put(url, data, config);
        return response.data;
    }

    async delete(url, config) {
        const response = await this.base.delete(url, config);
        return response.data;
    }
}
