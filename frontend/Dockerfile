# Step 1: Use a Node.js base image
FROM node:22

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 6: Install rollup
RUN npm install @rollup/rollup-linux-arm64-gnu

# Step 7: Copy the rest of the application files to the container
COPY . .

# Step 8: Expose the port your SvelteKit app runs on (default is 3000 for `npm run dev`)
EXPOSE 3000

# Step 9: Run the development server
CMD ["npm", "run", "dev"]