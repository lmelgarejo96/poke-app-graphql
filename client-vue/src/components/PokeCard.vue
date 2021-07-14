<template>
  <div class="poke-card">
    <div class="poke-image">
      <img
        draggable="false"
        :src="prevImage ? prevImage : getImage(Pokemon.image)"
        :alt="Pokemon.name"
      />
    </div>
    <div class="poke-description">
      <div class="poke-number">N.° {{ convertCodeNumber(Pokemon.order) }}</div>
      <h3 class="poke-name">{{ Pokemon.name }}</h3>
      <ul role="list" class="poke-abilities pl-0">
        <li v-for="(esp, idx) in Pokemon.species" :key="Pokemon.order+esp+idx">
          {{esp}}
        </li>
      </ul>
    </div>
    <slot name="crud-buttons"></slot>
  </div>
</template>

<script>
import ImageService from "@/common/ImageService";
export default {
  props: {
    prevImage: String,
    Pokemon: Object,
  },
  methods: {
    convertCodeNumber(order) {
      const arr = order.toString().split("");
      let cod = "";
      for (let i = 0; i < 4 - arr.length; i++) {
        cod += "0";
      }
      cod += arr.toString().replace(/,/g, "");
      return cod || "";
    },
    getImage(file) {
      return ImageService(file);
    },
  },
};
</script>

<style lang="scss" scoped></style>
