FROM node
WORKDIR /app
COPY package.json /app
RUN npm install -g npm@latest --no-warnings
RUN npm install
COPY . /app
CMD ["node","api.js"]