const environment = "local"
const config = {
  backend: {
    url: "http://localhost:4500"
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...config,
  name: environment
}
