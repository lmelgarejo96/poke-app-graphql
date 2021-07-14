<template>
  <div class="wrapper">
    <PokeList></PokeList>
  </div>
</template>

<script>
import PokeList from "@/components/PokeList";

export default {
  name: "Home",
  components: {
    PokeList
  },
};
</script>
