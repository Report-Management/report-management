import {BaseRepository} from "../../core/index.js";


export class UserRepository extends BaseRepository {
    constructor() {
        super("user");
    }


    async getInfo () {
        const response = await this.get('/get_me');
        return await this.checkError(response);
    }


    async updateUsername(newUsername) {
        const response = await this.put(`/change_name?name=${newUsername}`)
        return await this.checkError(response)
    }

    async updateProfile(newProfile) {
        const response = await this.put(`/change_profile?url=${newProfile}`)
        return await this.checkError(response)
    }
}