FROM node:12-alpine


WORKDIR /app

COPY . .

RUN apk update && \
    apk add git && \
    apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh

ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH


RUN yarn global add @vue/cli

RUN yarn install
ENV HOST 0.0.0.0
EXPOSE 3000

CMD yarn build && yarn start
