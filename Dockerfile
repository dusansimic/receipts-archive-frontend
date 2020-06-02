# Start from node alpine image
FROM node:lts-alpine as builder

# Setting workdir inside the container
WORKDIR /app

# Copy package.json
COPY package.json .

# Download all dependencies
RUN npm install

# Copy all the source
COPY . .

# Build the website
RUN npm run build

# Start new stage
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/. .

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
