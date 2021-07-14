<template>
  <div class="autocomplete-wrapper">
    <v-autocomplete
      class="special-input"
      :items="options ? options : []"
      v-model="selected"
      :placeholder="placeholder"
      :multiple="multiple"
      :rounded="rounded"
      :color="color"
      :dark="dark"
      :background-color="bgColor"
      :rules="[]"
      :disabled="disabled"
      :hide-details="hideDetails"
      :outlined="outlined"
      :filled="filled"
      :dense="dense"
      :autocomplete="autocomplete"
      small-chips
      :item-text="itemText"
      :item-value="itemValue"
      clearable
      @change="$emit('changed', selected)"
    >
      <template v-slot:selection="data">
        <v-chip
          color="primary"
          small
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >
          {{ data.item && data.item.name ? data.item.name : data.item }}
        </v-chip>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import AdvancedSearch from "vue-advanced-search";
import "vue-advanced-search/dist/AdvancedSearch.css";
export default {
  components: { AdvancedSearch },
  props: {
    itemText: String,
    itemValue: String,
    options: Array,
    model: Array,
    multiple: Boolean,
    placeholder: String,
  },
  data() {
    return {
      rounded: true,
      color: "primary",
      bgColor: "#fff",
      required: [(v) => !!v || "Requerido"],
      upToZero: [(v) => (!!v && v > 0) || "Incorrecto"],
      disabled: false,
      hideDetails: true,
      filled: true,
      outlined: false,
      dense: true,
      autocomplete: "off",
      readonly: true,
      dark: false,
      //
      selected: this.model ? this.model._id || this.model : "",
    };
  },
  methods: {
      remove (item) {
        const index = this.selected.indexOf(item)
        if (index >= 0) this.selected.splice(index, 1)
      },
  },
};
</script>
<style lang="scss">
.autocomplete-wrapper {
  margin-bottom: 30px;
}
</style>
