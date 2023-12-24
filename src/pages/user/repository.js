import {BaseRepository} from "../../core/index.js";


export class UserRepository extends BaseRepository {
    constructor() {
        super("user");
    }


    async getInfo () {
        const response = await this.get('/get_me');
        return await this.checkError(response);
    }
}