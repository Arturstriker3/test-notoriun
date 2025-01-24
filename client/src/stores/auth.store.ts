import { defineStore } from "pinia";
import authService from "@/services/auth.service";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

export const authStore = defineStore("auth", {
  state: () => ({
    isAuthServiceCall: false,
    userAuth: {
      code: "",
    },
  }),

  actions: {
    async sendVerificationCode(email: string) {
      this.isAuthServiceCall = true;
      try {
        const response = await authService.requestCode(email);
        toaster.success("Código de verificação enviado com sucesso");
        return response.data
      } catch (error) {
        console.error("Erro ao enviar código de verificação:", error);
        throw new Error("Falha ao enviar código de verificação");
      } finally {
        this.isAuthServiceCall = false;
      }
    },
  },
});
