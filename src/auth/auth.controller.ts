import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LoginResponseDto } from './dto/login-auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({
    summary: 'Log in a user',
    description: 'Authenticates the user and returns a JWT token and email.'
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated',
    type: LoginResponseDto
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials'
  })
  async login(@Body() createAuthDto: LoginAuthDto): Promise<LoginResponseDto> {
    return this.authService.login(createAuthDto);
  }
}
