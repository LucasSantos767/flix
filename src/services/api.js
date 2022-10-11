import axios from "axios";
import store from "@/store";
export const http = axios.create({
    baseURL: "https://kong.desenvolvimento.tallos.com.br/lu/",
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
