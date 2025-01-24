import apiService from "@/api/api.service";
import axiosInstance from "@/api/axios";
import type { INewUser } from "@/interfaces/IUsers";

class userService {
  urlBase = apiService.user;

  formatPhone(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  preparePayload(newUser: INewUser): INewUser {
    newUser.userPhone = this.formatPhone(newUser.userPhone).slice(-9);
    if (newUser.institutionPhone) {
      newUser.institutionPhone = this.formatPhone(newUser.institutionPhone).slice(-9);
    }

    if (!newUser.institutionPhoneCode || newUser.institutionPhoneCode.length < 2) {
      delete newUser.institutionPhoneCode;
    }

    if (!newUser.institutionPhone || newUser.institutionPhone.length < 9) {
      delete newUser.institutionPhone;
    }

    if (!newUser.institutionEmail || !/\S+@\S+\.\S+/.test(newUser.institutionEmail)) {
      delete newUser.institutionEmail;
    }

    return newUser;
  }

  post(newUser: INewUser) {
    const preparedUser = this.preparePayload(newUser);
    return axiosInstance.post(`${this.urlBase}`, preparedUser);
  }
}

export default new userService();