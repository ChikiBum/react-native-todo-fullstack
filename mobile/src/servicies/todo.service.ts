
import axios from "axios";
import HttpService from "./http.service";
import Constants from "expo-constants";
import { AppConfig } from "../../app.config";
import { ITodo, TodoQueryParams } from "../type/todoTypes";

const { BASE_URL, API_TODO } = Constants.manifest?.extra as AppConfig;

class TodoService extends HttpService {
    constructor(
        baseUrl: string,
        fetchingService: typeof axios = axios,
        apiVersion: string,
    ) {
        super(baseUrl, fetchingService, apiVersion);
    }

    async fetchTodos(params: TodoQueryParams) {
        const { data } = await this.getAll(params);
        return data;
    }

    async addTodo(data: ITodo) {
        return await this.post<ITodo>(data);
    }

    async updateTodo(id: string, data: ITodo) {
        return await this.put<ITodo>(id, data);
    }

    async deleteTodo(id: string) {
        return await this.delete(id);
    }
}

export const todoService = new TodoService(BASE_URL, axios, API_TODO);
