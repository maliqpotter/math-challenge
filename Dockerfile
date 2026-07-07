# Step 1: Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for building)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application (client Vite build + server bundle)
RUN npm run build

# Step 2: Production runner stage
FROM node:24-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy build artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Create data directory for JSON database/sqlite persistence
RUN mkdir -p /app/data

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
