import {BaseRepository} from "../../core/index";

export class AuthRepository extends BaseRepository {
    constructor() {
        super("Authentications");
    }

    async getLogin() {
        const body = {
            "username": "string",
            "password": "string"
        };
        const response = await this.post('/login', body);
        if (response !== null) {
            return response;
        }
        return null;
    }
}

