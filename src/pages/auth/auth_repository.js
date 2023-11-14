import {BaseRepository, supabaseSession} from "../../core/index";

export class AuthRepository extends BaseRepository {
    constructor() {
        super("Authentications");
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

    async getLogout() {
        const response = await supabaseSession.auth.signOut()
        return await this.checkSupabaseError(response)
    }

    async getUserRole(id) {

        const response = await this.get("/check?id=" + id)
        return response.detail
    }

    async getMicrosoftLogin() {
        const response = await supabaseSession.auth.signIn({
            provider: 'microsoft',
            options: {
                scopes: 'email',
            },
        })
        return await this.checkSupabaseError(response)
    }
}

