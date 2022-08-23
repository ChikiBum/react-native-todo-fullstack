import "dotenv/config";

export interface AppConfig {
  BASE_URL: string,
  API_TODO: string,
  API_USER: string,
}

export default {
    name: "ToDo App",
    version: "1.0.0",
    extra: {
        BASE_URL: process.env.BASE_URL,
        API_TODO: process.env.API_TODO,
        API_USER: process.env.API_USER,
    },
};
