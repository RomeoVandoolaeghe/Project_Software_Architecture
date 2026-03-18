import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// 1. Importe les modules Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active la validation globale (utile pour tes DTOs)
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // --- 2. Configuration de Swagger ---
  const config = new DocumentBuilder()
    .setTitle('Medium-like API')
    .setDescription(
      "Documentation de l'API pour le projet d'Architecture Logicielle",
    )
    .setVersion('1.0')
    .addBearerAuth() // Indispensable pour tester tes routes protégées avec un token JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // 3. Monte Swagger sur la route '/api'
  SwaggerModule.setup('api', app, document);
  // -----------------------------------

  await app.listen(3000);
}
bootstrap();
