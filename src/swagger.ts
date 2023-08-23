import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { description, version } from '../package.json';

export function setupSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Wankul-TCG')
    .setDescription(description)
    .setVersion(version)
    .build();
  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey: string) => methodKey,
  };
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerOptions,
  );
  SwaggerModule.setup('api', app, swaggerDocument);
}
