<template>
  <div>
    <div class="col-lg-12 top-searcher pb-5">
      <Search v-on:updated="search = $event" class="input-search-full"></Search>
      <Button :onPress="openCreate" text="Agregar">
        <template v-slot:icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
          </svg>
        </template>
      </Button>
    </div>
    <div class="row">
      <div v-if="openForm" class="col-lg-12 col-md-12 col-sm-12 mb-4">
        <PokeForm
          :key="indexForm"
          :pokeProp="pokeEdited"
          :pokemonsList="pokemons"
          v-on:closeForm="openForm = false"
          v-on:pokeSaved="onPokeSaved"
        ></PokeForm>
      </div>
      <div
        v-for="(poke, idx) in pokemons"
        :key="poke.order + idx"
        class="col-lg-3 col-md-4 col-sm-6 mb-3 d-flex"
      >
        <PokeCard :Pokemon="poke">
          <template v-slot:crud-buttons>
            <CrudButton
              v-on:open="openPokedex(poke.order)"
              v-on:edit="openToEdit(poke)"
              v-on:remove="openToRemove(poke)"
              class="absolute-top-right"
            ></CrudButton>
          </template>
        </PokeCard>
      </div>
    </div>

    <!-- POKEDEX -->
    <Pokedex
      v-if="pokedex"
      :opened="pokedex"
      v-on:closePokedex="closePokedex"
      :pokeOrder="pokeOrder"
    ></Pokedex>
  </div>
</template>

<script>
import Search from "@/components/inputs/Search";
import Button from "@/components/buttons/Button";
import PokeCard from "@/components/PokeCard";
import PokeForm from "@/components/forms/PokeForm";
import Pokedex from "@/components/Pokedex";
import CrudButton from "@/components/buttons/CrudButtons";
import GET_POKEMONS from "@/graphql/getPokemons";
import DELETE_POKEMON from "@/graphql/deletePokemon";
import gql from "graphql-tag";
import { mapActions } from "vuex";

export default {
  components: { PokeCard, Search, CrudButton, Button, PokeForm, Pokedex },
  data() {
    return {
      indexForm: 50,
      openForm: false,
      search: "",
      pokeEdited: null,
      pokedex: false,
      pokeOrder: 0,
    };
  },
  apollo: {
    pokemons: {
      query() {
        return GET_POKEMONS;
      },
      variables() {
        return {
          keyword: this.search,
        };
      },
      update: (data) => data.getPokemons,
      result() {
        this.updateLoader(false);
      },
      error(error) {
        this.updateLoader(false);
      },
      fetchPolicy: 'no-cache'
    },
    hello: gql`
      query {
        hello
      }
    `,
  },
  methods: {
    ...mapActions({
      generateMessageStatus: "generateMessageStatus",
      generateConfirmDialog: "generateConfirmDialog",
      updateLoader: "updateLoader",
    }),
    openCreate() {
      this.pokeEdited = null;
      this.indexForm += 10;
      this.openForm = true;
    },
    openToEdit(pokemon) {
      this.pokeEdited = { ...pokemon };
      this.indexForm += 10;
      this.openForm = true;
    },
    async openToRemove(pokemon) {
      const val = await this.generateConfirmDialog({ message: `La siguiente acción eliminará a ${pokemon.name} de la lista de pokemones`});
      if(!val) return;
      this.$apollo.mutate({
        mutation: DELETE_POKEMON,
        variables: {
          pokeId: pokemon._id
        },
        update: async(store) => {
          await this.$apollo.queries.pokemons.refetch();
          this.updateLoader(false);
        },
        error(error) {
          this.generateMessageStatus({ type: "error", message: "No se pudo eliminar!"})
          this.updateLoader(false);
        }
      })
    },
    async onPokeSaved() {
      await this.$apollo.queries.pokemons.refetch();
      this.openForm = false;
    },
    openPokedex(order) {
      this.pokeOrder = order;
      this.pokedex = true;
    },
    closePokedex() {
      this.pokedex = false;
      this.pokeOrder = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.top-searcher {
  width: 100%;
  display: flex;
  align-items: center;
  .input-search-full {
    width: 100%;
  }
  @media screen and(min-width: 600px) {
    .input-search-full {
      margin-right: 15px;
    }
  }
}
</style>
