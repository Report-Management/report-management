import {BaseRepository} from "../../../core/index.js";

export const userData = [
    {
        id: 1,
        name: "John Doe",
        email: "phanith.lim@rupp.edu.kh",
        role: "User"
    },
    {
        id: 2,
        name: "Phanith",
        email: "lim.phanith.2821@rupp.edu.kh",
        role: "User"
    },
    {
        id: 3,
        name: "Heng",
        email: "lim.heng.2821@rupp.edu.kh",
        role: "User"
    },
    {
        id: 3,
        name: "Sing Sing",
        email: "doung.sing.2821@rupp.edu.kh",
        role: "User"
    },
    {
        id: 4,
        name: "Manith",
        email: "you.somanith.2821@rupp.edu.kh",
        role: "User"
    },
]

export class AdminCreateUserRepository extends BaseRepository {
    constructor() {
        super("Authentications");
    }

    async createAccount(username, email, password, role) {
        const body = {
            'username': username,
            "email": email,
            "password": password,
            "role": role,
        };
        const response = await this.post('/create', body, );
        return await this.checkError(response)
    }
}