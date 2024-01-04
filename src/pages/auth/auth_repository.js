import {BaseRepository, supabaseSession} from "../../core/index";

export class AuthRepository extends BaseRepository {
    constructor() {
        super("authentications");
    }

    async getLogin(email, password) {
        const response = await supabaseSession.auth.signInWithPassword(
            {
                email: email,
                password: password,
            }
        )
        return await this.checkSupabaseError(response)
    }

    async getUserRole(id) {
        const response = await this.get("/check/" + id)
        return await this.checkError(response)
    }

    async getVerifyEmail(email) {
        const body = {
            "email": email
        }
        const response = await this.post("/sent-forget-password/", body)
        console.log(response)
        const data = await this.checkError(response)
        return data !== null
    }
}

