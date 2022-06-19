FROM node:12
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "tsconfig.json", "next-env.d.ts", "./"]
COPY . .
RUN npm install 
ENV NODE_ENV=production
RUN npm run build 
# FROM nginx
# EXPOSE 3000
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]