# Base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the production server
CMD ["npm", "start"]
