# Use Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Build TypeScript (optional)
RUN npm run build

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "dist/main.js"]
