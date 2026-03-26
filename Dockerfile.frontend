FROM node:24-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock ./

RUN npm install -g yarn -f

RUN echo -e "registry=https://registry.npmjs.org/" > /usr/src/app/.npmrc
RUN yarn config set registry https://registry.npmjs.org/
RUN yarn cache clean
RUN export NODE_OPTIONS="--max-old-space-size=8000" && yarn upgrade
RUN export NODE_OPTIONS="--max-old-space-size=8000" && yarn
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN export NODE_OPTIONS="--max-old-space-size=8000" && yarn build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

EXPOSE 3000
CMD [ "yarn", "start" ]
