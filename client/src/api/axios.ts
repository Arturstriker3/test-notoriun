import axios from "axios";
import errorUtils from "@/utils/error.utils";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

const axiosInstance = axios.create();

// const accessToken = "Afg6PIgOPTZtwlSYED7bJHR0rbQ6sIUe";

// axiosInstance.interceptors.request.use((request) => {
//     request.headers.Authorization = `Basic ${accessToken}`;
//     return request;
// })

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response || !error.response.data || !error.response.data.statusCode) {
            const errorMessage = errorUtils.get(error);
            toaster.error(errorMessage);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;