import axios from "axios";
import store from "@/store";
export const http = axios.create({
    baseURL: "http://150.230.78.209:18000/lu/",
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json'
    }
})

http.interceptors.request.use(function (config) {
    const token = store.state.token

    if (token) {
        if (config.headers) config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function (erro) {
    return Promise.reject(erro)
})
