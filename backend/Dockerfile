FROM node:18-alpine

WORKDIR /app

# Instalar dependencias de compilación para algunos paquetes si es necesario
# RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm install

# Copiamos el resto del código (aunque en desarrollo se sobreescribirá con el volumen)
COPY . .

# Exponemos el puerto
EXPOSE 3000

# El CMD se define en el docker-compose para dev, pero dejamos uno por defecto
CMD ["npm", "start"]
