# Use Node.js base image
FROM node:22-alpine

WORKDIR /app

# Copy package files and source code
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]