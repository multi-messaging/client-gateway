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
  RawBodyRequest,
  Req,
  Headers,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { environment } from 'src/config';
@Controller('whatsapp/webhook')
export class WhatsappMessengerController {
  private readonly logger = new Logger(WhatsappMessengerController.name);
  constructor(
    @Inject(environment.whatsapp.serviceName)
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
      .send('whatsapp.webhook.verify', {
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
  receiveMessage(
    @Body() body: any,
    @Headers('x-hub-signature-256') signature?: string,
    @Req() req?: RawBodyRequest<Request>,
  ) {
    this.logger.log('Mensaje recibido desde WhatsApp');
    this.logger.debug('Body completo:', JSON.stringify(body, null, 2));

    // Verificar firma de WhatsApp si está configurada
    if (signature) {
      const rawBody = req?.rawBody
        ? req.rawBody.toString()
        : JSON.stringify(body);
      this.client
        .send('whatsapp.webhook.verify-signature', {
          rawBody,
          signature,
        })
        .pipe(
          catchError((err) => {
            this.logger.error('Error al verificar la firma de WhatsApp:', err);
            throw new RpcException(err);
          }),
        );
      this.logger.log('✅ Firma de WhatsApp verificada correctamente');
    }
    return this.client.send('whatsapp.webhook.message', body).pipe(
      catchError((err) => {
        this.logger.error('Error al procesar el mensaje de WhatsApp:', err);
        throw new RpcException(err);
      }),
    );
  }
}
