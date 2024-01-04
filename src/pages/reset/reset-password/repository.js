import axios from "axios";
import {toast} from "react-toastify";


export class ResetPasswordRepository {

    async onChangePassword (password, token) {
        const body = {
            "password": password
        }
        const data = await axios.post(
            "https://report-management-api-8ef0940ce088.herokuapp.com/authentications/reset-password",
            body,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        ).catch((error) => {
            if (error.response && error.response.data && error.response.data.detail) {
                toast.error(error.response.data.detail);
            } else {
                toast.error("An error occurred");
            }
            return null
        })
        return data !== null;

    }
}