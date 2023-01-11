# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY package*.json ./

RUN npm install

COPY . ./

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000

CMD ["npm", "start"]

# Start the app
#CMD [ "npx", "serve", "build" ]