import axios, {Method, AxiosResponse} from "axios";


const api = axios.create({baseURL: process.env.BASE_URL});

const request = <T>(method: Method, url: string,data:any=null,  params:any=null ):Promise<AxiosResponse<T>> => {
    return api.request<T>({
        method,
        url,
        data,
       params,
       headers: {
        "Content-Type": "application/json",
      },
        
    })
}

export default request;