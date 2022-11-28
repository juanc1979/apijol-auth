import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TokenDto } from './dtos/token.dto';
import { UserCredentialDto } from './dtos/user-credential.dto';
import { TokenService } from './token.service';

@Controller('token')
@ApiTags('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Post()
  async create(@Body() user: UserCredentialDto): Promise<TokenDto> {
    try {
      return await this.tokenService.getToken(user.username, user.password);
    } catch (error) {
      throw new HttpException(error.data, error.status);
    }
  }
}
