FROM node:16.15.0 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./frontend/package.json /app/
COPY ./frontend/yarn.lock /app/
RUN yarn
COPY ./frontend /app
ENV NODE_ENV production
RUN yarn build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf.template /etc/nginx/templates/default.conf.template
