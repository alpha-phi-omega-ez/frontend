FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Set correct permissions for nextjs user and don't run as root
RUN addgroup nodejs
RUN adduser -SDH nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy the build files from your Next app into the container
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public/ ./public/

USER nextjs

# Expose port 3000
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Healthcheck for status of docker container
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://0.0.0.0:3000/api/health || exit 1

# Run the nextjs app
CMD ["node", "server.js"]