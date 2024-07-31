import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { JWT_SECRET_KEY } from 'src/constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [JwtModule.register({
    global: true,
    secret: JWT_SECRET_KEY,
    signOptions: { expiresIn: '1d' },
  })]
})
export class AuthModule { }
