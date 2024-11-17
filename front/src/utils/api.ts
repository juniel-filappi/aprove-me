import axios from "axios";
import Router from "next/router";

const api = axios.create({
    baseURL: "http://localhost:3333/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

export function setToken(token: string) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
}

api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            localStorage.clear();

            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);


export default api;