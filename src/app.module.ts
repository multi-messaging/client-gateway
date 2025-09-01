import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacebookModule } from './channels/facebook/facebook.module';
import { InstagramModule } from './channels/instagram/instagram.module';

@Module({
  imports: [FacebookModule, InstagramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
