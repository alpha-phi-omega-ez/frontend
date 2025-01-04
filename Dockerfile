# Use the official Nginx image
FROM nginx:stable-alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static files
RUN rm -rf ./*

# Copy the build files from your Next app into the container
COPY .next/ .

# Copy the public folder to include static files
COPY public/ ./public/

# Copy a custom Nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Healthcheck for status of docker container
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://0.0.0.0:3000/api/health || exit 1

# Expose port 3000
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]