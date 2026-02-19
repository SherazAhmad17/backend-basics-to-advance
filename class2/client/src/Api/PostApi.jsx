import { api } from "./AxiosIntense";

const postApi = {
        createPost: (data)=>{
            return api.post('/post/create-post' , data)
        }
}

export {postApi}