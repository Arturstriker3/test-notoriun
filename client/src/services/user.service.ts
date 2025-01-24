import apiService from "@/api/api.service";
import axiosInstance from "@/api/axios";
import type { INewUser } from "@/interfaces/IUsers";

class userService {
  urlBase = apiService.user;

  post(newUser: INewUser) {
    const data = {
      newUser,
    };

    return axiosInstance.post(`${this.urlBase}/users`, data);
  }
}

export default new userService();