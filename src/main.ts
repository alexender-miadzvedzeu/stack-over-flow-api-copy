import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Stackoverflow copy")
    .setDescription("Stackoverflow copy API description")
    .setVersion("1.0.0")
    .addTag("stackoverflow")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("/api", app, document);
  const config = await app.get(ConfigService);
  const PORT = config.get<number>("API_PORT");
  await app.listen(PORT || 3000, () =>
    console.log(`Server started on PORT: ${PORT}`),
  );
}
bootstrap();
