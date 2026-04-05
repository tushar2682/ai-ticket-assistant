# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set environment to production
ENV NODE_ENV=production

# Create app directory and set as working directory
WORKDIR /app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY --chown=nodejs:nodejs . .

# Copy environment file if it exists (for development/testing)
# In production, use environment variables instead
COPY --chown=nodejs:nodejs .env* ./

# Switch to non-root user
USER nodejs

# Expose the port the app runs on
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version || exit 1

# Start the application
CMD ["npm", "start"]