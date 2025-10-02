FROM node:18-alpine AS builder

# Install security updates
RUN apk update && apk upgrade && \
  rm -rf /var/cache/apk/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --silent --only=production

# Copy source code
COPY . .

# Build with optimizations
RUN npm run build -- \
  --configuration=production \
  --aot \
  --build-optimizer \
  --common-chunk \
  --vendor-chunk \
  --extract-licenses \
  --source-map=false

# Production stage
FROM nginx:alpine AS production

# Install curl for health checks and security updates
RUN apk update && apk upgrade && \
  apk add --no-cache curl && \
  rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nginx && \
  adduser -S nginxuser -u 1001 -G nginx

# Copy optimized nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built app
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Copy and make entrypoint executable
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Fix permissions
RUN chown -R nginxuser:nginx /usr/share/nginx/html && \
  chown -R nginxuser:nginx /var/cache/nginx && \
  chown -R nginxuser:nginx /var/log/nginx && \
  chown -R nginxuser:nginx /etc/nginx/conf.d && \
  touch /var/run/nginx.pid && \
  chown -R nginxuser:nginx /var/run/nginx.pid

USER nginxuser

EXPOSE 80

# Enhanced health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/ || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]