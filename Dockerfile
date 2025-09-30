# Use Node.js-Debian base image
FROM node:22-trixie

# Update base Distributin packages
RUN apt-get update && apt-get install -y

WORKDIR /app

# Copy package files and source code
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]