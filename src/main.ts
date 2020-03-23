import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());
  app.use(helmet());
  app.enableCors();

  const config = app.get<ConfigService>(ConfigService);

  app.use(
    rateLimit({
      windowMs: config.get<number>('RATE_LIMIT_WINDOW_MINS') * 60 * 1000,
      max: config.get<number>('RATE_LIMIT_WINDOW_MAX'),
    }),
  );

  await app.listen(config.get<number>('NODE_PORT'));
}
bootstrap();
