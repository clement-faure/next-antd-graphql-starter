FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

# Bundle app source
COPY . /usr/src/app

# Building app
RUN yarn build

# Remove dev dependencies
RUN rm -rf node_modules
RUN yarn install --production

# Expose port
EXPOSE 3000

CMD [ "yarn", "start" ]
