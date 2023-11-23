import axios from "axios";
import {toast} from "react-toastify";

export class BaseRepository {
    constructor(path) {
        this.baseURL = "https://report-management-api-8ef0940ce088.herokuapp.com/";
        this.base = axios.create({
            baseURL: this.baseURL + path,
        });
        this.base.defaults.timeout = 60000;
        this.base.interceptors.request.use((config) => {
            const token = JSON.parse(localStorage.getItem('sb-uazzhgvzukwpifcufyfg-auth-token'));
            config.headers["Authorization"] = "Bearer " + token.access_token;
            return config;
        });
    }


    async checkSupabaseError(response) {
        if (response.error) {
            toast.error(response.error.message);
            return null
        }
        console.log(response.data)
        return response.data;
    }

    async checkError(response) {
        if(response === null) {
            return null
        }
        return response.detail;
    }

    async get(url, config) {
        const response = await this.base.get(url, config).catch((error) => {
            toast.error(error.response.data.detail)
            return null
        })
        if (response !== null) {
            return response.data;
        }

        return null;
    }

    async post(url, data, config) {
        const response = await this.base.post(url, data, config).catch((error) => {
            toast.error(error.response.data.detail)
            return null
        })
        if (response !== null) {
            return response.data;
        }

        return null;
    }

    async put(url, data, config) {
        const response = await this.base.put(url, data, config).catch((error) => {
            toast.error(error.response.data.detail)
            return null
        })
        if (response !== null) {
            return response.data;
        }

        return null;
    }

    async delete(url, config) {
        const response = await this.base.delete(url, config).catch((error) => {
            toast.error(error.response.data.detail)
            return null
        })
        if (response !== null) {
            return response.data;
        }

        return null;
    }
}
