import { Module } from '@nestjs/common';
import {
  WhatsappController,
  WhatsappMessengerController,
  WhatsappWebhookController,
} from './controllers';
import { ClientsModule } from '@nestjs/microservices';
import { environment } from 'src/config';
import { rabbitmqConfig } from 'src/config/rabbitmq.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: environment.whatsapp.serviceName,
        ...rabbitmqConfig(environment.whatsapp.rabbitmqQueue),
      },
    ]),
  ],
  controllers: [
    WhatsappWebhookController,
    WhatsappMessengerController,
    WhatsappController,
  ],
  providers: [],
})
export class WhatsappModule {}
