import {BaseRepository} from "../../../core/index.js";


export class DashboardRepository extends BaseRepository {
    constructor() {
        super("Authentications");
    }

    async getUserRole(userId) {
        const response = await this.get("/check?id=" + userId);
        return await this.checkError(response);
    }

    async getLogin(email, password) {
        const body = {
            "email": email,
            "password": password
        }
        const response = await this.put("/login", body);
        return await this.checkError(response);
    }
}