#Backend Docker file

# Use Node.js 22 as base image
FROM node:22

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies, including TypeScript
RUN npm install

# Copy the TypeScript source code (src folder) into the container
COPY . .

# Run TypeScript compiler to transpile code to dist
RUN npx tsc

# Expose the port your app will run on (adjust if necessary)
EXPOSE 3000

# Command to run the app after transpiling TypeScript
CMD ["node", "dist/index.js"]