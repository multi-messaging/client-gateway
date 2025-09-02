FROM node:22-alpine

WORKDIR /usr/src/app

RUN corepack enable

COPY package.json yarn.lock* ./

# Instalar NestJS CLI globalmente
RUN echo "=== INSTALANDO NESTJS CLI ===" && \
    yarn global add @nestjs/cli@^11.0.0 && \
    echo "NestJS CLI instalado. Versión: $(nest --version)" || echo "Versión no disponible"

RUN yarn install --frozen-lockfile --production=false --ignore-engines

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]