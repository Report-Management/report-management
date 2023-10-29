import {BaseRepository} from "../../core/index";

export class AuthRepository extends BaseRepository {
    constructor() {
        super("Authentications");
    }

    async getLogin(email, password) {
        const body = {
            "username": email,
            "password": password,
        };
        const response = await this.post('/login', body);
        return await this.checkError(response)
    }
}

