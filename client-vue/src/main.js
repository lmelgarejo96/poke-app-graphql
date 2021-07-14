import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import config from "./config";

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import vuetify from "./plugins/vuetify";

// HTTP connection to the API
const httpLink = createHttpLink({
    uri: `${config.HOST_URL}/api/graphql`,
});

// Cache implementation
const cache = new InMemoryCache({ addTypename: false });

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    defaultOptions: {
        fetchPolicy: 'no-cache'
    }
});

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

Vue.use(VueApollo);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    apolloProvider,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");