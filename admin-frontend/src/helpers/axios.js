import axios from 'axios'
import { apiPrefix } from '../constants/contants'
export const axiosInstance = axios.create({
    baseURL : apiPrefix,
    headers: {'authorization': localStorage.getItem("token")}
})

