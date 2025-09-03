import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { environment } from 'src/config';
import { rabbitmqConfig } from 'src/config/rabbitmq.config';
import {
  FacebookMessengerController,
  FacebookWebhookController,
} from './controllers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: environment.facebook.serviceName,
        ...rabbitmqConfig(environment.facebook.rabbitmqQueue),
      },
    ]),
  ],
  controllers: [FacebookWebhookController, FacebookMessengerController],
  providers: [],
})
export class FacebookModule {}
