# 1. Base Image: Start from the official Node.js Long Term Support (LTS) image
# Using a slim version is generally better for smaller image sizes.
FROM node:20-slim

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy application dependency manifests to the container
# This is a key optimization: copying only package.json and package-lock.json first
# allows Docker to cache the 'npm install' step.
COPY package*.json ./

# 4. Install dependencies
# The --omit=dev flag ensures only production dependencies are installed, reducing image size.
RUN npm install --omit=dev

# 5. Copy the rest of the application source code (server.js and the 'public' folder)
COPY . .

# 6. Expose the port the application runs on
# This is documentation for the user; it doesn't actually publish the port.
EXPOSE 8080

# 7. Command to run the application when the container starts
# Uses the "start" script defined in package.json
CMD [ "npm", "start" ]