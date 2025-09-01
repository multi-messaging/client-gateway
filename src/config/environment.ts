import 'dotenv/config';

import * as joi from 'joi';

interface Environment {
  PORT: number;
  RABBITMQ_URL: string;
  RABBITMQ_QUEUE: string;
  FACEBOOK_SERVICE_NAME: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().integer().min(1).max(65535).default(3000),
    RABBITMQ_URL: joi.string().uri().default('amqp://localhost:5672'),
    RABBITMQ_QUEUE: joi.string().default('messages_queue'),
    FACEBOOK_SERVICE_NAME: joi.string().default('FACEBOOK_SERVICE'),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

const envVars: Environment = value;

export const environment = {
  port: envVars.PORT,
  rabbitmq: {
    url: envVars.RABBITMQ_URL,
    queue: envVars.RABBITMQ_QUEUE,
  },
  facebook: {
    serviceName: envVars.FACEBOOK_SERVICE_NAME,
  },
};
