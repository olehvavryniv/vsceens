FROM node:14-alpine as builder
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run-script build

FROM arm32v7/nginx
COPY --from=builder ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
