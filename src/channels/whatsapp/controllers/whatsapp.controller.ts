import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { environment } from 'src/config';
@Controller('whatsapp')
export class WhatsappController {
  private readonly logger = new Logger(WhatsappController.name);
  constructor(
    @Inject(environment.whatsapp.serviceName)
    private readonly client: ClientProxy,
  ) {}

  @Get('health')
  async healthCheck() {
    this.logger.log('Ejecutando health check de WhatsApp');

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.health.check', {}).pipe(
          catchError((err) => {
            this.logger.error('Error en health check:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error en health check:', error);
      throw new RpcException(error);
    }
  }
}
