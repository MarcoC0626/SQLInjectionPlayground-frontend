# Use the latest LTS version of Node.js
FROM node:23-alpine
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of your application files
COPY . .
 
# Expose the port your app runs on
EXPOSE 3000
 
# Set environment to development
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true
ENV FAST_REFRESH=true
ENV WDS_SOCKET_PORT=3000
 
# Define the command to run your app
CMD ["npm", "run", "start-watch"]

# For Windows PowerShell:
# docker run -it -p 3000:3000 -v ${PWD}:/app -v /app/node_modules --name stock-front stock-front

# For Linux/Mac:
# docker run -it -p 3000:3000 -v $(pwd):/app -v /app/node_modules --name stock-front stock-front