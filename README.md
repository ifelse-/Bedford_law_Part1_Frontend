# benny-law

# Docker Setup
Now let’s build the Docker image of our Vue.js app:

docker build -t bedford-law/docker-bedford-law-app .
Finally, let’s run our Vue.js app in a Docker container:

docker run -it -p 8080:8080 --rm --namedocker-bedford-law-app-1 bedford-law/docker-bedford-law-app
We should be able to access our Vue.js app on localhost:8080.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



