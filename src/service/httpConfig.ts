import axios, {AxiosInstance} from "axios";

export const apiClient: AxiosInstance = axios.create(
    {
        baseURL: `${import.meta.env.VITE_BASE_URL!}`,
        timeout: +import.meta.env.VITE_APP_TIMEOUT!
    }
);