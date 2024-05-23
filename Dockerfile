# Dockerfile para configurar Apache y agregar el archivo de configuración personalizado

FROM httpd:2.4

# Copiar los archivos HTML al directorio de documentos de Apache
COPY ./public-html/ /usr/local/apache2/htdocs/

# Copiar el archivo de configuración personalizado
COPY ./my-httpd.conf /usr/local/apache2/conf/my-httpd.conf

# Incluir el archivo de configuración personalizado en la configuración principal de Apache
RUN echo "Include /usr/local/apache2/conf/my-httpd.conf" >> /usr/local/apache2/conf/httpd.conf

EXPOSE 8088

# Iniciar el servidor Apache en el puerto 8088
CMD ["httpd-foreground", "-D", "FOREGROUND", "-f", "/usr/local/apache2/conf/httpd.conf"]
