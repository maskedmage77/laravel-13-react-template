FROM php:8.4-fpm-alpine

# Runtime deps + build headers, installed in one layer.
RUN apk add --no-cache \
    bash \
    git \
    curl \
    nano \
    nodejs \
    npm \
    unzip \
    zip \
    libpng-dev \
    libzip-dev \
    oniguruma-dev \
    libxml2-dev \
  && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Pin Composer to an image rather than piping a download into php.
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

ENV COMPOSER_ALLOW_SUPERUSER=1
