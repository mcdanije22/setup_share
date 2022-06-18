# FROM nginx:1.16.0-alpine
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
# Base on offical NGINX Alpine image
FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./default.conf /etc/nginx/conf.d/

RUN apk update && apk add git && apk add bash
RUN git clone https://github.com/vishnubob/wait-for-it.git

# Expose the listening port
EXPOSE 80 443

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]
