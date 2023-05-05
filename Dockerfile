FROM node:alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh
RUN sed -i 's/\r//' /app/startup.sh
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["sh", "/app/startup.sh"]