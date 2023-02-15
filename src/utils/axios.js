import axios from 'axios'

export const axiosInstance = axios.create( {
    baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
    timeout: 1000
} )