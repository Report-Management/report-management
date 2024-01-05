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
            if (token && token.access_token) {
                config.headers["Authorization"] = "Bearer " + token.access_token;
            }
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
        if(response === null) {
            return null
        }
        if(typeof response == "boolean"){
            return response
        }
        return response.result;
    }

    async get(url, config) {
        const response = await this.base.get(url, config).catch((error) => {
            console.log(error)
            if (error.response && error.response.data && error.response.data.detail) {
                toast.error(error.response.data.detail);
            } else {
                toast.error("An error occurred");
            }
            return null
        })
        if (response !== null) {
            return response.data;
        }
        return null;
    }

    async post(url, data, config) {
        const response = await this.base.post(url, data, config).catch((error) => {
            console.log(error)
            if (error.response && error.response.data && error.response.data.detail) {
                toast.error(error.response.data.detail);
            } else {
                toast.error("An error occurred");
            }
            return null
        })
        return response !== null;
    }

    async put(url, data, config) {
        const response = await this.base.put(url, data, config).catch((error) => {
            console.log(error)
            if (error.response && error.response.data && error.response.data.detail) {
                toast.error(error.response.data.detail);
            } else {
                toast.error("An error occurred");
            }
            return null
        })
        return response !== null;
    }

    async delete(url, config) {
        const response = await this.base.delete(url, config).catch((error) => {
            if (error.response && error.response.data && error.response.data.detail) {
                toast.error(error.response.data.detail);
            } else {
                toast.error("An error occurred");
            }
            return null
        })
        return response !== null;
    }
}
