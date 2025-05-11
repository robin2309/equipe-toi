FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]