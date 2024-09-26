import axios, { AxiosResponse } from "axios";
import { Game } from "../models/game";
import { Tag } from "../models/tag";
import { Category } from "../models/category";

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
    create: (game: Game) => axios.post<void>('/games', game),
    update: (game: Game) => axios.put<void>(`/games/${game.id}`, game),
    delete: (id: string) => axios.delete<void>(`/games/${id}`)
}

const Tags = {
    list: () => requests.get<Tag[]>('/tags'),
    details: (name: string) => requests.get<Tag>(`/tags/${name}`),
    create: (tag: Tag) => axios.post<void>('/tags', tag),
    update: (tag: Tag) => axios.put<void>(`/tags/${tag.id}`, tag),
    delete: (id: string) => axios.delete<void>(`/tags/${id}`)
}

const Categories = {
    list: () => requests.get<Category[]>('/categories'),
    details: (name: string) => requests.get<Category>(`/categories/${name}`),
    create: (category: Category) => axios.post<void>('/categories', category),
    update: (category: Category) => axios.put<void>(`/categories/${category.id}`, category),
    delete: (id: string) => axios.delete<void>(`/categories/${id}`)
}

const agent = {
    Games,
    Tags,
    Categories
}

export default agent;