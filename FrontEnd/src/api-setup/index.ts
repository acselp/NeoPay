import * as axios from "axios";

const baseUrl = "http://192.168.1.5:8083";

export const apiSetup = axios.create({
    baseURL: baseUrl
})