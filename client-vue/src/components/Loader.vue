<template>
  <div  :class="`loader ${active ? 'active' : ''}`">
    <div class="pokeball bounce"></div>
  </div>
</template>

<script>
export default {
    props: {
        active: Boolean
    }
};
</script>

<style lang="scss" scoped></style>
