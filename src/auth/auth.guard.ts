import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT_SECRET_KEY } from 'src/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    let token
    try {
      token = await this.extractToken(request)
      if (!token) {
        throw new UnauthorizedException()
      }
      await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET_KEY
      })
    } catch (error) {
      throw new UnauthorizedException()
    }
    return true;
  }

  extractToken(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ')
    return type === 'Bearer' ? token : undefined
  }

}
