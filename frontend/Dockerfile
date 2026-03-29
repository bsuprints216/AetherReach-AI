FROM node:20-alpine

WORKDIR /app

# Install project dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Run the project in development mode
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
