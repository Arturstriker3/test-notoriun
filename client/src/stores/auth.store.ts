import { defineStore } from "pinia";
import authService from "@/services/auth.service";
// import { createToaster } from "@meforma/vue-toaster";

export const authStore = defineStore("categories", {
  state: () => ({
    isAuthServiceCall: false,
  }),

  actions: {
    async sendVerificationCode(email: string) {
      this.isAuthServiceCall = true;
      try {
        const response = await authService.requestCode(email);
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