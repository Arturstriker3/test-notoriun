import { defineStore } from "pinia";
import authService from "@/services/auth.service";

export const userStore = defineStore("categories", {
  state: () => ({
    isAuthServiceCall: false,
    userAuth: {
      "code": "",
    },
  }),

  actions: {
    async sendVerificationCode(email: string) {
      this.isAuthServiceCall = true;
      try {
        const response = await authService.requestCode();
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao enviar código de verificação:", error);
        throw new Error("Falha ao enviar código de verificação");
      } finally {
        this.isAuthServiceCall = false;
      }
    },
  },
});