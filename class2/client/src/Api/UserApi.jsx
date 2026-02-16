import { api } from "./AxiosIntense";

const UserApi = {

    registerUser: (data)=>{
        return api.post("/auth/register", data)
    },

    me:()=>{
        return api.get("/users/me")
    }

}

export default UserApi