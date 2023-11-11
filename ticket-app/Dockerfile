FROM node:20-alpine
WORKDIR /src
COPY package* .
COPY .env .

RUN npm i
COPY . .

COPY proto ./proto

RUN npm run build
ENV NODE_ENV=production

EXPOSE 3001
EXPOSE 3002
CMD ["npm", "run" ,"serve"]