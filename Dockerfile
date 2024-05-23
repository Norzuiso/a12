# Usa una imagen base de Node.js para construir la aplicación Angular
FROM node:16 as build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Construye la aplicación Angular para producción
RUN npm run build -- --output-path=dist

# Usa una imagen base de Nginx para servir la aplicación Angular
FROM nginx:alpine

# Copia los archivos construidos de la etapa anterior al contenedor de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 para el servidor Nginx
EXPOSE 8088

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
