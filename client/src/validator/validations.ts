import emailUtils from "@/utils/email.utils";
import documentUtils from "@/utils/document.utils";

export const inputSizes = {
  smallLength: 10,
  mediumLength: 50,
  largeLength: 100,
  phoneLength: 15,
  cepLength: 8,
  cnpjLength: 14,
};

export const validationRules = {
  required: (value: string) => !!value || "Campo obrigatório",
  email: (value: string) => {
    if (!value) return true;
    return emailUtils.isValid(value) || "Por favor, insira um e-mail válido";
  },
  phone: (value: string) => {
    if (!value) return true;
    const phoneRegex = /^\(\d{2}\) 9\d{4}-\d{4}$/;
    return (
      phoneRegex.test(value) ||
      "O telefone deve estar no formato (XX) 9XXXX-XXXX"
    );
  },
  cnpj: (value: string) => {
    return documentUtils.isCnpj(value) || "CNPJ inválido";
  },
};
