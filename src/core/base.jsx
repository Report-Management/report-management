import axios from "axios";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

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
        return response.data;
    }

    async checkError(response) {
        console.log(response.status_code);
        if (response.status_code >= 400 && response.status_code < 600) {
            toast.error(response.detail);
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
