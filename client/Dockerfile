FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "tsconfig.json", "next-env.d.ts", "./"]
COPY . .
RUN npm install 
ENV NODE_ENV=production
RUN npm run build 
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
