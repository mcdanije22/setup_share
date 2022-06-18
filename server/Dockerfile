FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "tsconfig.json", "nodemon.json", "./"]
RUN apk update && apk add git
RUN git clone https://github.com/vishnubob/wait-for-it.git
RUN npm install -g ts-node nodemon
RUN npm install --production --silent && mv node_modules ../
ENV GENERATE_SOURCEMAP=false
COPY . .
EXPOSE 5000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
