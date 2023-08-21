import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { version } from '../package.json';

export function setupSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Wankul-TCG')
    .setDescription(
      'The Wankul-TCG API exposes the cards from the Wankul TCG created by Wankil Studio.',
    )
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
