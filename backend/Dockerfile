FROM node:18
RUN apt update --yes
RUN apt upgrade --yes
RUN apt install netcat-traditional --yes
RUN mkdir -p /var/www/backend && chown -R node:node /var/www/backend
RUN chmod -R 755 /var/www/backend
WORKDIR /var/www/backend
COPY . .
RUN npm install
RUN npm run build
USER node
ENV NODE_ENV dev
ENV PORT 3922
CMD ["bash","start.sh"]