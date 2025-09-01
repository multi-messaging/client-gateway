import { IsString, IsOptional, IsObject, IsArray, IsNumber } from 'class-validator';

export class NormalizedMessageDto {
  @IsString()
  messageId: string;

  @IsString()
  senderId: string;

  @IsString()
  recipientId: string;

  @IsString()
  channel: string; // 'facebook', 'whatsapp', etc.

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsArray()
  attachments?: Array<{
    type: string;
    url: string;
    mime_type?: string;
  }>;

  @IsNumber()
  timestamp: number;

  @IsOptional()
  @IsObject()
  metadata?: any; // Datos específicos del canal

  @IsOptional()
  @IsString()
  conversationId?: string;

  @IsOptional()
  @IsObject()
  userProfile?: {
    firstName?: string;
    lastName?: string;
    profilePic?: string;
  };
}

export class PostbackEventDto {
  @IsString()
  senderId: string;

  @IsString()
  recipientId: string;

  @IsString()
  channel: string;

  @IsString()
  payload: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsNumber()
  timestamp: number;

  @IsOptional()
  @IsObject()
  metadata?: any;
}