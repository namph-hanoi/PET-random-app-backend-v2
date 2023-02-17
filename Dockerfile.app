# Specify the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package.json ./

# Install dependencies
RUN yarn

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3005

# Define environment variables
ENV NODE_ENV=developement
ENV PORT=3005

# Start the application
CMD ["yarn", "dev"]
