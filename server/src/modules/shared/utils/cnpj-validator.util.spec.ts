import { isValidCnpj } from './cnpj-validator.util';

describe('CNPJ Validator Utility', () => {
  it('should return true for a valid CNPJ', () => {
    expect(isValidCnpj('12345678000195')).toBe(true);
  });

  it('should return false for an invalid CNPJ', () => {
    expect(isValidCnpj('12345678000100')).toBe(false);
  });

  it('should return false for CNPJs with all digits equal', () => {
    expect(isValidCnpj('11111111111111')).toBe(false);
  });

  it('should return false for CNPJs with incorrect length', () => {
    expect(isValidCnpj('123')).toBe(false);
  });
});
