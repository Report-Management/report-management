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
        super("authentications");
    }

    async createAccount(username, email, password, role) {
        const body = {
            'username': username,
            "email": email,
            "password": password,
            "role": role,
        };
        const response = await this.post('/create', body,);
        return await this.checkError(response)
    }
}

export class AdminUserRepository extends BaseRepository {
    constructor() {
        super("user");
    }

    async getUsers() {
        const response = await this.get("/all_user")
        const data = await this.checkError(response)
        const list_users = []
        if (data !== null) {
            data.forEach((user) => {
                list_users.push({
                    id: user.id,
                    name: user.username,
                    email: user.email,
                    role: user.role,
                    profilePhoto: user.profilePhoto,
                })
            })
            return list_users
        }
        return []
    }
}