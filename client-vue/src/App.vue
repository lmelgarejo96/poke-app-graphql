<template>
  <v-app id="application" class="container-scroll">
    <Header></Header>
    <main class="container">
      <router-view />
    </main>
    <Footer></Footer>
    <Loader :active="loader"></Loader>
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Loader from "@/components/Loader";
import { mapGetters } from "vuex";
export default {
  components: {
    Header,
    Loader,
    Footer
  },
  computed: {
    ...mapGetters({
      loader: "getLoader",
    }),
  },
};
</script>

<style lang="scss">
@import "./assets/main.css";
.v-application--wrap {
  min-height: auto !important;
  display: block !important;
}
#application {
  width: 100vw;
  min-height: 90vh;
  background: rgb(10, 25, 47);
}

/* Special input */
.v-input.special-input {
  outline: 1px solid rgba(0, 75, 134, 0.15) !important;
  border: 1px solid #dee2e6 !important;
  border-radius: 0px !important;
}
.v-input input::placeholder {
  font-size: 14px !important;
  color: rgba(0, 0, 0, 0.7) !important;
}

.v-autocomplete:not(.v-input--is-focused).v-select--chips input {
  max-height: 100% !important;
  padding: 0;
}

.container-scroll::-webkit-scrollbar {
  width: 8px;

  @media screen and (max-width: 850px) {
    width: 4px;
    height: 4px;
    &.scroll-pokedex {
      display: none;
    }
  }
}

@media screen and (max-width: 600px) {
  .wrapper {
    padding-top: 0px !important;
  }
  .top-searcher  {
    display: flex;
    flex-flow:  column nowrap !important;
    
    .clear-absolute {
      top: 8px !important;
    }
    button {
      margin-top: 15px;
      margin-bottom: 30px;
    }
  }
}

.container-scroll::-webkit-scrollbar-thumb {
  background: #999999;
  border-radius: 4px;
}

.container-scroll::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

.container-scroll::-webkit-scrollbar-thumb:active {
  background-color: #999999;
}
</style>
