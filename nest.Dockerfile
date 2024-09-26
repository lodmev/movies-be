FROM node:18
WORKDIR app
COPY package*.json ./
RUN npm install
EXPOSE 5000
COPY . .
RUN npx prisma generate && npm run build
CMD ["node", "dist/src/main.js" ]