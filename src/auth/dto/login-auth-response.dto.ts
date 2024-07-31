import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: 'JWT token for authentication' })
  token: string;

  @ApiProperty({ description: 'Email of the user' })
  email: string;
}
