import { defineStore } from "pinia";
import { createToaster } from "@meforma/vue-toaster";
import userService from "@/services/user.service";
import type { INewUser } from "@/interfaces/IUsers";

const toaster = createToaster();

export const userStore = defineStore("user", {
  state: () => ({
    isUserServiceCall: false,
    newUser: {
      name: "",
      userPhoneCode: "",
      userPhone: "",
      email: "",
      cnpj: "",
      institutionName: "",
      institutionPhoneCode: "",
      institutionPhone: "",
      institutionEmail: "",
      postalCode: "",
      state: "",
      city: "",
      neighborhood: "",
      address: "",
      number: "",
      complement: "",
      location: {
        type: "Point",
        coordinates: [0, 0] as [number, number],
      },
    } as INewUser,
  }),

  actions: {
    resetNewUser() {
      toaster.warning("Dados do novo usuário resetados");
      this.newUser = {
        name: "",
        userPhoneCode: "",
        userPhone: "",
        email: "",
        cnpj: "",
        institutionName: "",
        institutionPhoneCode: "",
        institutionPhone: "",
        institutionEmail: "",
        postalCode: "",
        state: "",
        city: "",
        neighborhood: "",
        address: "",
        number: "",
        complement: "",
        location: {
          type: "Point",
          coordinates: [0, 0],
        },
      };
    },

    async createNewUser() {
      this.isUserServiceCall = true;
      try {
        const response = await userService.post(this.newUser);
        toaster.success("Uusário criado com sucesso");
        return response.data;
      } catch (error) {
        console.error("Erro ao criar novo usuário:", error);
        throw new Error("Falha ao tentar criar novo usuário");
      } finally {
        this.isUserServiceCall = false;
      }
    },
  },
});
