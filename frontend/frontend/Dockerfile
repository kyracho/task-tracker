# Stage 1: Build the Angular app
FROM node:18 AS build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve the app using Nginx
FROM nginx:alpine AS production-stage

# Copy the built Angular app to Nginx's HTML directory
COPY --from=build-stage /app/dist/frontend /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will serve the app on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
