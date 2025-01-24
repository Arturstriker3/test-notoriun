import apiService from "@/api/api.service";
import axiosInstance from "@/api/axios";

class authService {
  urlBase = apiService.auth;

  requestCode(email: string) {
    const data = {
      email: email,
    };

    return axiosInstance.post(`${this.urlBase}/request-code`, data);
  }

  validateCode(email: string, code: string) {
    const data = {
      email: email,
      code: code,
    };

    return axiosInstance.post(`${this.urlBase}/validate-code`, data);
  }

  resendCode(email: string) {
    const data = {
      email: email,
    };

    return axiosInstance.post(`${this.urlBase}/resend-code`, data);
  }
}

export default new authService();
