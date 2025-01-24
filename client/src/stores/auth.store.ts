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
        return response.data;
      } catch (error) {
        console.error("Erro ao enviar código de verificação:", error);
        throw new Error("Falha ao enviar código de verificação");
      } finally {
        this.isAuthServiceCall = false;
      }
    },

    async resendVerificationCode(email: string) {
      this.isAuthServiceCall = true;
      try {
        const response = await authService.resendCode(email);
        toaster.success("Código de verificação enviado novamente");
        return response.data;
      } catch (error) {
        console.error("Erro ao enviar o novo código de verificação:", error);
        throw new Error("Falha ao enviar o novo código de verificação");
      } finally {
        this.isAuthServiceCall = false;
      }
    },

    async verifyCode(email: string, code: string) {
      this.isAuthServiceCall = true;
      try {
        const response = await authService.validateCode(email, code);
        if (response.data.message === "Code validated successfully") {
          toaster.success("Código de verificação validado com sucesso");
          return response.data;
        }
      } catch (error) {
        console.error("Erro ao validar o código de verificação:", error);
        throw new Error("Falha ao processar a validação do código");
      } finally {
        this.isAuthServiceCall = false;
      }
    },
  },
});
