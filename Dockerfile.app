# Specify the base image
FROM node:19-bullseye

# For the psql commands
RUN apt-get update -y \
&& apt-get install -y libpq-dev \
&& apt-get install -y postgresql-common \
&& apt-get install -y postgresql-client \
&& apt-get install -y locales \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/* \

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
ENV NODE_ENV=development
ENV PORT=3005


# locale setting for psql login
RUN locale-gen en_US.UTF-8
ENV LC_ALL=en_US.UTF-8 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    PYTHONIOENCODING=utf-8
RUN localedef -f UTF-8 -i en_US en_US.utf8

# Start the application
RUN chmod +x scripts/entrypoint.dev.sh
ENTRYPOINT ["scripts/entrypoint.dev.sh"]
