# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies (none needed, but placeholder)
RUN npm install express

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
