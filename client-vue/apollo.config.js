import config from "./src/config";

module.exports = {
  client: {
    service: {
      name: "my-poke-app",
      // URL to the GraphQL API
      url: `${config.HOST_URL}/api/graphql`,
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
