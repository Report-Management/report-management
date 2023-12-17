import {BaseRepository} from "../../../core";

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

    async onUpdateUser(id, userRole) {
        if (userRole === "Admin"){
            const response = await this.put(`/to_admin/${id}`)
            const data = await this.checkError(response)
            return data != null;
        }else if (userRole === "User") {
            const response = await this.put(`/to_normal/${id}`)
            const data = await this.checkError(response)
            return data != null;
        }
    }

    async onDeleteUser(id) {
        const response = await this.delete("/")
    }
}