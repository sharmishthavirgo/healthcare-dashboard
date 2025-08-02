# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock* ./ 
# Use yarn.lock* for both yarn.lock and package-lock.json compatibility
RUN yarn install --frozen-lockfile # Or `npm install` if you use npm

# Copy the rest of the application source code
COPY . .

# Build for production
# Adjust 'build' command if you use 'npm run build' or a different script
RUN yarn build # Or `npm run build`

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build output from the builder stage to Nginx's HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html 
# For Vite output is usually 'dist'
# If you used Create React App, it's typically `/app/build`
# COPY --from=builder /app/build /usr/share/nginx/html

# Copy Nginx custom configuration for Single Page Applications (SPAs)
# This ensures that routes like /patients are handled correctly by React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80, which Nginx will listen on inside the container
EXPOSE 80

# Command to run Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
