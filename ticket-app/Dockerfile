FROM node:20-alpine
WORKDIR /usr/src/app
COPY . .

RUN npm i

# RUN npm run build

EXPOSE 8002
CMD ["npm", "run" ,"dev"]