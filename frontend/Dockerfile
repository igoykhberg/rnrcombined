FROM node:18
RUN mkdir -p /var/www/frontend && chown -R node:node /var/www/frontend
WORKDIR /var/www/frontend
COPY . .
RUN yarn
RUN yarn build
RUN yarn global add serve
USER node
ENV NODE_ENV custom
CMD ["yarn", "preview"]
