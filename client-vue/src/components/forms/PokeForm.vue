<template>
  <form class="form-app" v-on:submit.prevent="sendForm">
    <div class="row mb-6">
      <div class="col-lg-9 col-md-8 col-sm-12">
        <div class="row">
          <div class="col-lg-12">
            <h2 class="title-form">
              {{ titleForm }}
            </h2>
          </div>
          <div v-if="errors" class="col-lg-12 col-md-12 col-sm-12">
            <ul class="pl-0">
              <li v-for="(error, idx) in errors" :key="error + idx + 1560">
                {{ error.message }}
              </li>
            </ul>
          </div>

          <div class="col-lg-9 col-md-9 col-sm-9">
            <InputForm
              :key="baseIndex + 1"
              :vModel="pokemon.name"
              v-on:changed="pokemon.name = $event"
              placeholder="Nombre pokemon"
              :required="true"
              errorMsg="Este campo es requerido"
            ></InputForm>
          </div>

          <div class="col-lg-3 col-md-3 col-sm-3">
            <InputForm
              :key="baseIndex + 2"
              :vModel="pokemon.order"
              v-on:changed="pokemon.order = $event"
              placeholder="Orden pokemon"
              :required="true"
              type="number"
              errorMsg="Campo requerido"
            ></InputForm>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12">
            <TextArea
              :key="baseIndex + 3"
              :vModel="pokemon.description"
              v-on:changed="pokemon.description = $event"
              placeholder="Descripción pokemon"
              :required="true"
              errorMsg="Campo requerido"
            ></TextArea>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6">
            <InputForm
              :key="baseIndex + 4"
              :vModel="pokemon.height"
              v-on:changed="pokemon.height = $event"
              placeholder="Altura pokemon"
              :required="true"
              errorMsg="Campo requerido"
              type="number"
            ></InputForm>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6">
            <InputForm
              :key="baseIndex + 5"
              :vModel="pokemon.weight"
              v-on:changed="pokemon.weight = $event"
              placeholder="Peso pokemon"
              :required="true"
              errorMsg="Campo requerido"
              type="number"
            ></InputForm>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6">
            <InputForm
              :key="baseIndex + 6"
              :vModel="pokemon.atack"
              v-on:changed="pokemon.atack = $event"
              placeholder="Ataque base"
              :required="true"
              errorMsg="Campo requerido"
              type="number"
            ></InputForm>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6">
            <InputForm
              :key="baseIndex + 7"
              :vModel="pokemon.defense"
              v-on:changed="pokemon.defense = $event"
              placeholder="Defensa base"
              :required="true"
              errorMsg="Campo requerido"
              type="number"
            ></InputForm>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12">
            <Autocomplete
              :key="baseIndex + 8"
              :model="pokemon.species"
              placeholder="Especie"
              :options="species"
              :multiple="true"
              v-on:changed="pokemon.species = $event"
            ></Autocomplete>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12">
            <Autocomplete
              :key="baseIndex + 9"
              :model="pokemon.abilities"
              placeholder="Habilidades Especiales"
              :options="abilities"
              :multiple="true"
              v-on:changed="pokemon.abilities = $event"
            ></Autocomplete>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12">
            <Autocomplete
              :key="baseIndex + 10"
              :model="pokemon.weakness"
              placeholder="Debilidades"
              :options="species"
              :multiple="true"
              v-on:changed="pokemon.weakness = $event"
            ></Autocomplete>
          </div>

          <div class="col-lg-12 col-md-12 col-sm-12">
            <Autocomplete
              :key="baseIndex + 11"
              :model="pokemon.evolutions"
              placeholder="Evoluciones"
              :options="pokemonsAvaible"
              itemText="name"
              itemValue="_id"
              :multiple="true"
              v-on:changed="pokemon.evolutions = $event"
            ></Autocomplete>
          </div>

          <div class="col-lg-12 col-md-12 col-sm-12">
            <InputFile
              :key="baseIndex + 12"
              v-on:fileUploaded="fileInfo = $event"
            ></InputFile>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 pb-4 pt-0 d-flex justify-content-end">
            <v-btn
              class="mr-3"
              @click="$emit('closeForm')"
              tile
              color="tertiary"
              depressed
            >
              Cerrar
            </v-btn>
            <v-btn
              type="submit"
              class="button"
              :loading="loading"
              :disabled="loading"
              tile
              dark
              color="secondary"
              depressed
            >
              Guardar
            </v-btn>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-12">
        <div class="col-lg-12 mb-3">
          <h2 class="title-form">Previsualización</h2>
        </div>
        <PokeCard
          :key="baseIndex + 13"
          :Pokemon="pokemon"
          :prevImage="fileInfo.imageURL"
        ></PokeCard>
      </div>
    </div>
  </form>
</template>

<script>
import InputForm from "@/components/inputs/Input";
import TextArea from "@/components/inputs/TextArea";
import Autocomplete from "@/components/inputs/Autocomplete";
import InputFile from "@/components/inputs/File";
import PokeCard from "@/components/PokeCard";
import { mapGetters, mapActions } from "vuex";
import GET_POKEMON from "@/graphql/getPokemon";
import ADD_POKEMON from "@/graphql/createPokemon";
import UPDATE_POKEMON from "@/graphql/updatePokemon"

export default {
  components: { InputForm, TextArea, InputFile, PokeCard, Autocomplete },
  props: { pokeProp: Object, pokemonsList: Array },
  apollo: {
    SinglePokemon: {
      // gql query
      query() { return GET_POKEMON},
      variables() {
        return {
          order: this.pokeProp ? this.pokeProp.order : 1,
        };
      },
      skip() {
        return this.skipQuery;
      },
      update: data => data.getPokemonByOrder,
      result({ data, loading, networkStatus }) {
        this.pokemon = { ...data.getPokemonByOrder };
        this.baseIndex += 1000;
        this.updateLoader(false);
      },
      error(error) {
        this.updateLoader(false);
        console.error("We've got an error!", error);
      },
      fetchPolicy: 'no-cache'
    },
  },
  created() {
    if (this.pokeProp) {
      this.updateLoader(true);
      this.$apollo.queries.SinglePokemon.skip = false;
    }
  },
  data() {
    return {
      baseIndex: 16560,
      loading: false,
      errors: [],
      // MODELO POKEMON
      pokemon: {
        name: "", //
        order: "", //
        description: "", //
        species: [],
        abilities: [],
        image: "", //
        height: "", //
        weight: "", //
        evolutions: [],
        weakness: [],
        atack: "", //
        defense: "", //
      },
      fileInfo: {
        file: null,
        imageURL: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      abilities: "getAbilities",
      species: "getSpecies",
    }),
    titleForm() {
      return this.pokeProp ? "Editar Pokemon" :"Agregar Pokemon";
    },
    pokemonsAvaible() {
      if (!this.pokemon.order) return this.pokemonsList;
      return this.pokemonsList.filter((po) => po.order != this.pokemon.order);
    },
  },
  methods: {
    ...mapActions({
      generateMessageStatus: "generateMessageStatus",
      generateConfirmDialog: "generateConfirmDialog",
      uploadFile: "uploadFile",
      deleteFile: "deleteFile",
      updateLoader: "updateLoader"
    }),
    sendForm(ev) {
      ev.preventDefault();
      if (this.pokeProp) {
        this.updatePokemon();
        return;
      }
      this.createPokemon();
    },
    // CREAR POKEMON
    async createPokemon() {
      this.updateLoader(true);
      if (this.fileInfo.file) {
        const res = await this.uploadFile(this.fileInfo.file);
        if (!res) return;
        this.pokemon.image = res._id;
      } else {
        this.pokemon.image =
          this.pokemon.image && this.pokemon.image._id
            ? this.pokemon.image._id
            : this.pokemon.image;
      }
      // Apollo mutation
      this.$apollo.mutate({
        mutation: ADD_POKEMON,
        variables: {
          pokemon: { ...this.pokemon },
        },
        update: (store, { data: { createPokemon } }) => {
          this.$emit("pokeSaved", createPokemon);
          this.updateLoader(false);
        },
        error(error)  {
          this.updateLoader(false);
        }
      });
    },
    // ACTUALIZAR POKEMON
    async updatePokemon() {
      this.updateLoader(true);
      let oldImg = null;
      if (this.fileInfo.file) {
        const res = await this.uploadFile(this.fileInfo.file);
        if (!res) return;
        oldImg = this.pokemon.image && this.pokemon.image._id
            ? this.pokemon.image._id
            : this.pokemon.image;
        this.pokemon.image = res._id;
      } else {
        this.pokemon.image =
          this.pokemon.image && this.pokemon.image._id
            ? this.pokemon.image._id
            : this.pokemon.image;
      }
      if(oldImg) {
        await this.deleteFile(oldImg);
      }
      this.pokemon.evolutions = this.pokemon.evolutions.map(ev => ev._id || ev);
      // Apollo mutation
      this.$apollo.mutate({
        mutation: UPDATE_POKEMON,
        variables: {
          pokemon: { ...this.pokemon },
        },
        update: (store, { data: { updatePokemon } }) => {
          this.$emit("pokeSaved", updatePokemon);
          this.updateLoader(false);
        },
        error(error) {
          this.updateLoader(false);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-app {
  transition: all ease-in-out 0.25s;
  animation: moveDown ease-in-out 0.25s;
}
@keyframes moveDown {
  0% {
    opacity: 0;
    transform: translateY(200px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
.title-form {
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.78);
}
</style>
