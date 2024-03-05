import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as passport from 'passport';
import * as Session from 'express-session';
import { jwtConstants } from './auth/constants';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // For Add Validation
  app.useGlobalPipes(new ValidationPipe());

  // For Check Auth With PAssport
  app.use(Session({ secret: jwtConstants.secret }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.setGlobalPrefix('/v1/api');

  // For config swagger
  const config = new DocumentBuilder()
    .setTitle('Nest Test Backend App')
    .setDescription('The Nest Test Backend API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
