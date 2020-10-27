FROM alpine:latest
WORKDIR /app
COPY . ./

RUN apk add --no-cache --upgrade \
	bash \
	go \
	nodejs \
	npm

# install node dependencies
RUN npm install
# for some reason this fixes an issue the container has with '$ npx webpack'
RUN npm rebuild

# expose api and website ports
EXPOSE 8080
EXPOSE 3000

# run on container start
CMD ./scripts/run