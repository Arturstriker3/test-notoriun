import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
