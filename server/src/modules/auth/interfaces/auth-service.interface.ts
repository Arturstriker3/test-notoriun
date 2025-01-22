export interface IAuthService {
  sendVerificationCode(email: string): Promise<{ messageUrl: string }>;
  validateCode(email: string, code: string): boolean;
}
