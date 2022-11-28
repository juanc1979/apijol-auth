import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';
import { catchError, firstValueFrom } from 'rxjs';
import { TokenDto } from './dtos/token.dto';

@Injectable()
export class TokenService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger(TokenService.name);

  async getToken(username: string, password: string): Promise<TokenDto> {
    const { data } = await firstValueFrom(
      this.httpService
        .post(
          `${process.env.AUTH0_ISSUER_URL}oauth/token`,
          new URLSearchParams({
            username,
            password,
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: process.env.AUTH0_AUDIENCE,
            grant_type: process.env.AUTH0_GRANT_TYPE,
          }),
          { headers: { 'content-type': 'application/x-www-form-urlencoded' } },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error.response;
          }),
        ),
    );

    return data;
  }
}
