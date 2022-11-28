import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { AuthzModule } from './authz/authz.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [HealthModule, ConfigModule.forRoot(), AuthzModule, TokenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
