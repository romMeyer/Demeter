FROM node:20-alpine
WORKDIR /demeter

COPY . .

RUN chown -R 1000:1000 /demeter

EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "1000", "--disable-host-check"]
