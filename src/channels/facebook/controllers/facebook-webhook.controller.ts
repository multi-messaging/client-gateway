import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { environment } from 'src/config';
@Controller('facebook/webhook')
export class FacebookWebhookController {
  private readonly logger = new Logger(FacebookWebhookController.name);
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

    return this.client
      .send('facebook.webhook.verify', {
        mode,
        challenge,
        verifyToken,
      })
      .pipe(
        catchError((err) => {
          this.logger.error('Error al verificar el webhook:', err);
          throw new RpcException(err);
        }),
      );
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
}
