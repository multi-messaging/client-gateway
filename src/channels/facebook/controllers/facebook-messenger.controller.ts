import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { environment } from 'src/config';
@Controller('facebook/messenger')
export class FacebookMessengerController {
  logger: any;
  constructor(
    @Inject(environment.facebook.serviceName)
    private readonly client: ClientProxy,
  ) {}
  @Get()
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.challenge') challenge: string,
    @Query('hub.verify_token') verifyToken: string,
  ) {
    this.logger.log(
      `Verificación de webhook recibida: mode=${mode}, token=${verifyToken}`,
    );

    return this.client.send('facebook.webhook.verify', {
      mode,
      challenge,
      verifyToken,
    });
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  receiveMessage(@Body() body: any) {
    this.logger.log('Mensaje recibido desde Facebook');
    this.logger.debug('Body completo:', JSON.stringify(body, null, 2));

    return this.client.send('facebook.webhook.message', body).pipe(
      catchError((err) => {
        this.logger.error('Error al procesar el mensaje:', err);
        throw new RpcException('Error al procesar el mensaje');
      }),
    );
  }

  @Get('health')
  healthCheck() {
    return this.client.send('facebook.health.check', {}).pipe(
      catchError((err) => {
        this.logger.error('Error en la verificación de salud:', err);
        throw new RpcException('Error en la verificación de salud');
      }),
    );
  }
}
