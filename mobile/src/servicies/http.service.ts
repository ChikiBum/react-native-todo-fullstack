import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoQueryParams } from "../type/todoTypes";

class HttpService {
    baseUrl: string;
    fetchingService: typeof axios;
    apiVersion: string;
    constructor(
        baseUrl: string,
        fetchingService: typeof axios = axios,
        apiVersion: string,
    ) {
        this.baseUrl = baseUrl;
        this.fetchingService = fetchingService;
        this.apiVersion = apiVersion;
    }

    private async getToken() {
        try {
            const value = await AsyncStorage.getItem("token");
            if (value !== null) {
                return value;
            }
            return null;
        } catch (error) {
            return null;
        }
    };

    private async getHeadersWithToken() {
        const headers = {
            Authorization: await this.getToken(),
        };

        return { headers };
    };

    private getFullApiUrl(url: string) {
        return `${this.baseUrl}${this.apiVersion}${url}`;
    };

    async getAll(params: TodoQueryParams) {
        const { isCopleted, todoTitle, startIndex, endIndex } = params;
        return await this.fetchingService
            .get(this.getFullApiUrl(`?todoTitle=${todoTitle}&isCompleted=${isCopleted}&startIndex=${startIndex}&endIndex=${endIndex}`),
                await this.getHeadersWithToken());
    };

    async put<T>(url: string, data: T) {
        return this.fetchingService.put(this.getFullApiUrl(url), data, await this.getHeadersWithToken());
    };

    async post<T>(data: T, url: string = "") {
        return this.fetchingService.post(this.getFullApiUrl(url), data, await this.getHeadersWithToken());
    };

    async delete(url: string) {
        return this.fetchingService.delete(this.getFullApiUrl(url), await this.getHeadersWithToken());
    }

    async auth<T>(url: string, data: T) {
        return this.fetchingService.post(this.getFullApiUrl(url), data);
    }
}

export default HttpService;
