import emailUtils from '@/utils/email.utils'

export const inputSizes = {
  smallLength: 10,
  mediumLength: 50,
  largeLength: 100,
};

export const validationRules = {
    required: (value: string) => !!value || "Campo obrigatório",
    email: (value: string) =>
      emailUtils.isValid(value) || "Por favor, insira um e-mail válido",
  };