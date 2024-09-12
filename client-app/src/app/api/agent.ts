import axios, { AxiosResponse } from "axios";
import { Game } from "../models/game";

axios.defaults.baseURL = 'http://localhost:5001/api';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.interceptors.response.use(async response => {
    try {
        await sleep(500);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.get<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.get<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.get<T>(url).then(responseBody),
}

const Games = {
    list: () => requests.get<Game[]>('/games'),
    details: (id: string) => requests.get<Game>(`/games/${id}`),
    create: (activity: Game) => axios.post<void>('/games', activity),
    update: (activity: Game) => axios.put<void>(`/games/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/games/${id}`)
}

const agent = {
    Games
}

export default agent;