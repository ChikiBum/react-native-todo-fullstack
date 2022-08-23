
import axios from "axios";
import HttpService from "./http.service";
import Constants from "expo-constants";
import { AppConfig } from "../../app.config";
import { IAuth } from "../type/authTypes";

const { BASE_URL, API_USER } = Constants.manifest?.extra as AppConfig;

class UserService extends HttpService {
    constructor(
        baseUrl: string,
        fetchingService: typeof axios = axios,
        apiVersion: string,
    ) {
        super(baseUrl, fetchingService, apiVersion);
    }

    async login(url: string, userData: IAuth) {
        const { data } = await this.auth<IAuth>(url, userData);
        return data;
    }

    async signUpUser(url: string, userData: IAuth) {
        const { data } = await this.auth<IAuth>(url, userData);
        return data;
    }

   
}

export const userService = new UserService(BASE_URL, axios, API_USER);
