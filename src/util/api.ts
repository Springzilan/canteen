import axios from "axios";

const inst = axios.create({
    baseURL: "http://192.168.2.2:3004",
})

export const  post = async <T>(url: string, data: any) => {
    return await inst.post<T>(url, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const  get = async <T>(url: string) => {
    return await inst.get<T>(url, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}