import { RequestCodeDto } from '../dtos/request-code.dto';
import { ValidateCodeDto } from '../dtos/validate-code.dto';

export interface IAuthController {
  requestCode(
    requestCodeDto: RequestCodeDto,
  ): Promise<{ message: string; messageUrl: string }>;
  validateCode(validateCodeDto: ValidateCodeDto): { message: string };
  resendCode(
    requestCodeDto: RequestCodeDto,
  ): Promise<{ message: string; messageUrl: string }>;
}
