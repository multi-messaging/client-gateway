import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Param,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom, catchError } from 'rxjs';
import { environment } from 'src/config';

// Importar los DTOs (asumiendo que los tienes en una carpeta shared o los defines aquí)
interface SendWhatsAppTextDto {
  to: string;
  text: string;
  preview_url?: boolean;
}

interface SendWhatsAppImageDto {
  to: string;
  image_url: string;
  caption?: string;
}

interface SendWhatsAppVideoDto {
  to: string;
  video_url: string;
  caption?: string;
}

interface SendWhatsAppAudioDto {
  to: string;
  audio_url: string;
}

interface SendWhatsAppDocumentDto {
  to: string;
  document_url: string;
  filename?: string;
  caption?: string;
}

interface SendWhatsAppLocationDto {
  to: string;
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
}

interface SendWhatsAppContactDto {
  to: string;
  contacts: Array<{
    name: {
      formatted_name: string;
      first_name?: string;
      last_name?: string;
    };
    phones?: Array<{
      phone: string;
      type?: string;
    }>;
    emails?: Array<{
      email: string;
      type?: string;
    }>;
  }>;
}

interface SendWhatsAppButtonsDto {
  to: string;
  body_text: string;
  buttons: Array<{
    id: string;
    title: string;
  }>;
  header_text?: string;
  footer_text?: string;
}

interface SendWhatsAppListDto {
  to: string;
  body_text: string;
  button_text: string;
  sections: Array<{
    title?: string;
    rows: Array<{
      id: string;
      title: string;
      description?: string;
    }>;
  }>;
  header_text?: string;
  footer_text?: string;
}

interface SendWhatsAppTemplateDto {
  to: string;
  template_name: string;
  language: string;
  components?: Array<{
    type: string;
    parameters?: Array<{
      type: string;
      text?: string;
      image?: { link: string };
      document?: { link: string; filename: string };
      video?: { link: string };
    }>;
  }>;
}

@Controller('whatsapp/messages')
export class WhatsappMessengerController {
  private readonly logger = new Logger(WhatsappMessengerController.name);

  constructor(
    @Inject(environment.whatsapp.serviceName)
    private readonly client: ClientProxy,
  ) {}

  /**
   * Envía un mensaje de texto por WhatsApp
   * POST /api/v1/whatsapp/messages/text
   */
  @Post('text')
  @HttpCode(HttpStatus.OK)
  async sendTextMessage(@Body() dto: SendWhatsAppTextDto) {
    this.logger.log(
      `Enviando mensaje de texto por WhatsApp a ${dto.to}: "${dto.text}"`,
    );

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.message.text', dto).pipe(
          catchError((err) => {
            this.logger.error('Error al enviar mensaje de texto:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error en envío de mensaje de texto:', error);
      throw new RpcException(error);
    }
  }

  /**
   * Envía una imagen por WhatsApp
   * POST /api/v1/whatsapp/messages/image
   */
  @Post('image')
  @HttpCode(HttpStatus.OK)
  async sendImage(@Body() dto: SendWhatsAppImageDto) {
    this.logger.log(
      `Enviando imagen por WhatsApp a ${dto.to}: ${dto.image_url}`,
    );

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.message.image', dto).pipe(
          catchError((err) => {
            this.logger.error('Error al enviar imagen:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error en envío de imagen:', error);
      throw new RpcException(error);
    }
  }

  /**
   * Envía un video por WhatsApp
   * POST /api/v1/whatsapp/messages/video
   */
  @Post('video')
  @HttpCode(HttpStatus.OK)
  async sendVideo(@Body() dto: SendWhatsAppVideoDto) {
    this.logger.log(
      `Enviando video por WhatsApp a ${dto.to}: ${dto.video_url}`,
    );

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.message.video', dto).pipe(
          catchError((err) => {
            this.logger.error('Error al enviar video:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error en envío de video:', error);
      throw new RpcException(error);
    }
  }

  /**
   * Envía un audio por WhatsApp
   * POST /api/v1/whatsapp/messages/audio
   */
  @Post('audio')
  @HttpCode(HttpStatus.OK)
  async sendAudio(@Body() dto: SendWhatsAppAudioDto) {
    this.logger.log(
      `Enviando audio por WhatsApp a ${dto.to}: ${dto.audio_url}`,
    );

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.message.audio', dto).pipe(
          catchError((err) => {
            this.logger.error('Error al enviar audio:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error en envío de audio:', error);
      throw new RpcException(error);
    }
  }

  /**
   * Envía un documento por WhatsApp
   * POST /api/v1/whatsapp/messages/document
   */
  @Post('document')
  @HttpCode(HttpStatus.OK)
  async sendDocument(@Body() dto: SendWhatsAppDocumentDto) {
    this.logger.log(
      `Enviando documento por WhatsApp a ${dto.to}: ${dto.document_url}`,
    );

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.message.document', dto).pipe(
          catchError((err) => {
            this.logger.error('Error al enviar documento:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error en envío de documento:', error);
      throw new RpcException(error);
    }
  }

  /**
   * Envía una ubicación por WhatsApp
   * POST /api/v1/whatsapp/messages/location
   */
  @Post('location')
  @HttpCode(HttpStatus.OK)
  async sendLocation(@Body() dto: SendWhatsAppLocationDto) {
    this.logger.log(
      `Enviando ubicación por WhatsApp a ${dto.to}: ${dto.latitude}, ${dto.longitude}`,
    );

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.message.location', dto).pipe(
          catchError((err) => {
            this.logger.error('Error al enviar ubicación:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error en envío de ubicación:', error);
      throw new RpcException(error);
    }
  }

  /**
   * Envía un contacto por WhatsApp
   * POST /api/v1/whatsapp/messages/contact
   */
  @Post('contact')
  @HttpCode(HttpStatus.OK)
  async sendContact(@Body() dto: SendWhatsAppContactDto) {
    this.logger.log(`Enviando contacto por WhatsApp a ${dto.to}`);

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.message.contact', dto).pipe(
          catchError((err) => {
            this.logger.error('Error al enviar contacto:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error en envío de contacto:', error);
      throw new RpcException(error);
    }
  }

  /**
   * Envía botones interactivos por WhatsApp
   * POST /api/v1/whatsapp/messages/buttons
   */
  @Post('buttons')
  @HttpCode(HttpStatus.OK)
  async sendInteractiveButtons(@Body() dto: SendWhatsAppButtonsDto) {
    this.logger.log(
      `Enviando botones interactivos por WhatsApp a ${dto.to} con ${dto.buttons.length} botones`,
    );

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.message.buttons', dto).pipe(
          catchError((err) => {
            this.logger.error('Error al enviar botones interactivos:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error en envío de botones interactivos:', error);
      throw new RpcException(error);
    }
  }

  /**
   * Envía una lista interactiva por WhatsApp
   * POST /api/v1/whatsapp/messages/list
   */
  @Post('list')
  @HttpCode(HttpStatus.OK)
  async sendInteractiveList(@Body() dto: SendWhatsAppListDto) {
    this.logger.log(
      `Enviando lista interactiva por WhatsApp a ${dto.to} con ${dto.sections.length} secciones`,
    );

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.message.list', dto).pipe(
          catchError((err) => {
            this.logger.error('Error al enviar lista interactiva:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error en envío de lista interactiva:', error);
      throw new RpcException(error);
    }
  }

  /**
   * Envía una template aprobada por WhatsApp
   * POST /api/v1/whatsapp/messages/template
   */
  @Post('template')
  @HttpCode(HttpStatus.OK)
  async sendTemplate(@Body() dto: SendWhatsAppTemplateDto) {
    this.logger.log(
      `Enviando template por WhatsApp a ${dto.to}: ${dto.template_name} (${dto.language})`,
    );

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.message.template', dto).pipe(
          catchError((err) => {
            this.logger.error('Error al enviar template:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error en envío de template:', error);
      throw new RpcException(error);
    }
  }

  /**
   * Marca un mensaje como leído
   * POST /api/v1/whatsapp/messages/mark-read/:messageId
   */
  @Post('mark-read/:messageId')
  @HttpCode(HttpStatus.OK)
  async markAsRead(@Param('messageId') messageId: string) {
    this.logger.log(`Marcando mensaje como leído: ${messageId}`);

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.message.mark-read', { messageId }).pipe(
          catchError((err) => {
            this.logger.error('Error al marcar mensaje como leído:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error marcando mensaje como leído:', error);
      throw new RpcException(error);
    }
  }

  /**
   * Obtiene información del contacto
   * GET /api/v1/whatsapp/messages/contact/:phoneNumber
   */
  @Get('contact/:phoneNumber')
  async getContactProfile(@Param('phoneNumber') phoneNumber: string) {
    this.logger.log(`Obteniendo perfil de contacto: ${phoneNumber}`);

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.contact.profile', { phoneNumber }).pipe(
          catchError((err) => {
            this.logger.error('Error al obtener perfil de contacto:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error obteniendo perfil de contacto:', error);
      throw new RpcException(error);
    }
  }

  /**
   * Endpoint para probar el envío de mensajes por WhatsApp
   * POST /api/v1/whatsapp/messages/test
   */
  @Post('test')
  @HttpCode(HttpStatus.OK)
  async testMessage(@Body() body: { to: string }) {
    this.logger.log(`🧪 Enviando mensaje de prueba por WhatsApp a ${body.to}`);

    try {
      return await firstValueFrom(
        this.client.send('whatsapp.message.test', body).pipe(
          catchError((err) => {
            this.logger.error('Error en mensaje de prueba:', err);
            throw new RpcException(err);
          }),
        ),
      );
    } catch (error) {
      this.logger.error('Error en mensaje de prueba:', error);
      throw new RpcException(error);
    }
  }
}