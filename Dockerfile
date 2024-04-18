# Use the official Node.js image as base
FROM node:18.0.0

# Copy package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React application for production
RUN npm run build

ENV NODE_ENV production 

# Expose port 3000 to the outside world
EXPOSE 3000

# Serve the built React application using a lightweight web server
CMD ["npx", "serve", "-s", "build"]
