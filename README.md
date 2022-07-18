# Example key derivation for different chains

**Stack: Vite + Typescript + Vue**

### Development

``` yarn && yarn dev```

### Build for production
``` yarn build ```

### Build docker and push to gitlab:

``` yarn build:production```


### Push to gitlab
``` docker push registry.gitlab.com/jimber/example-chaining```


### Pull image (on server)

``` docker pull registry.gitlab.com/jimber/example-chaining```

### Run container (detached)
``` docker run -d --name "chains-example" --network proxy registry.gitlab.com/jimber/example-chaining:latest```
