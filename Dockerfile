FROM node:lts-alpine as builder

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install --omit=dev

ADD . .

RUN npm run build

FROM nginx:1.21.6-alpine

COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/movies.conf.template /etc/nginx/templates/movies.conf.template

EXPOSE 80
CMD ["nginx","-g","daemon off;"]