import {BaseRepository} from "../../core/index";

export class ForgetRepository extends BaseRepository {
    constructor() {
        super("authentications");
    }

    async getVerifyEmail(email) {
        const body = {
            "email": email
        }
        const response = await this.post("/sent-forget-password/", body)
        console.log(response)
        return  await this.checkError(response)
    }
}

