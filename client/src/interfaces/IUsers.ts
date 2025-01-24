export interface INewUser {
  name: string;
  userPhoneCode: string;
  userPhone: string;
  email: string;
  cnpj: string;
  institutionName: string;
  institutionPhoneCode: string;
  institutionPhone: string;
  institutionEmail: string;
  postalCode: string;
  state: string;
  city: string;
  neighborhood: string;
  address: string;
  number: string;
  complement: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
}
