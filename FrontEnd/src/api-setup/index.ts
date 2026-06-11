import * as axios from "axios";

const baseUrl = "http://localhost:8081";

export const apiSetup = axios.create({
    baseURL: baseUrl
})