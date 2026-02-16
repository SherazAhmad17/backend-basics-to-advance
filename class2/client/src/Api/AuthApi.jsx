import { api } from "./AxiosIntense";


const AuthApi = {

    login: (data)=>{
        return api.post("/auth/login" , data);
    },

    refreshToken: ()=>{
        return api.post("/auth/refresh-token")
    }


}

export  {AuthApi}