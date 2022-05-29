const environment = "local"
const config = {
  backend: {
    url: "https://aqueous-springs-90349.herokuapp.com/"
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...config,
  name: environment
}
