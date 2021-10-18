import axios, { AxiosResponse } from "axios";
import { Activity } from "../layout/models/Activity";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.interceptors.response.use( response => {
    sleep(1000).then(() => {
        return response;
    })
})
const responseBody =  (response : AxiosResponse) => response.data;
const requests = {
    get: (url: string) => axios.get(url).then(responseBody)
} 
const Activities = {
    list: () => requests.get('/activities')
}
const agent = {
    Activities
}
export default agent;