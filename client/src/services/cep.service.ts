import axiosInstance from "@/api/axios";

class cepService {
  getCepInfo(cep: string) {

    const sanitizedCep = cep.replace(/\D/g, "");
    const urlBase = `https://viacep.com.br/ws/${sanitizedCep}/json/`;

    return axiosInstance.get(`${urlBase}`);
  }
}

export default new cepService();
