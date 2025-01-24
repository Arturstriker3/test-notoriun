import emailUtils from '@/utils/email.utils'

export const inputSizes = {
  smallLength: 10,
  mediumLength: 50,
  largeLength: 100,
  phoneLength: 15,
};

export const validationRules = {
    required: (value: string) => !!value || "Campo obrigatório",
    email: (value: string) =>
      emailUtils.isValid(value) || "Por favor, insira um e-mail válido",
    phone: (value: string) => {
        const phoneRegex = /^\(\d{2}\) 9\d{4}-\d{4}$/;
    
        return (
          phoneRegex.test(value) || "O telefone deve estar no formato (XX) 9XXXX-XXXX"
        );
      },
  };