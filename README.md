# Example key derivation for different chains

## Chains

This example will demonstrate account creation + showing balance for following chains:

- [x] Stellar Native
- [x] Stellar TFChain
- [x] TFChain (Substrate)
- [ ] Binance Smart Chain
- [ ] Cosmos (ThreeFold?)
- [x] Algorand 

**Stack: Vite + Typescript + Vue**

### Development

``` yarn && yarn dev```

### Build for production
``` yarn build ```

### Build docker:

``` yarn build:production```


### Push to gitlab
``` docker push registry.gitlab.com/jimber/example-chaining```


### Pull image (on server)

``` docker pull registry.gitlab.com/jimber/example-chaining```

### Run container (detached)
``` docker run -d --name "chains-example" --network proxy registry.gitlab.com/jimber/example-chaining:latest```
