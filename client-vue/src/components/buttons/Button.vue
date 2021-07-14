<template>
  <button @click="onPress" class="button">
    <span class="title">{{ text }}</span>
    <slot name="icon"></slot>
  </button>
</template>

<script>
export default {
  props: {
    text: String,
    onPress: Function,
  },
};
</script>

<style lang="scss" scoped>
.button {
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3em 1.5em;
  font-size: 14px;
  border: 1px solid rgb(53, 134, 128);
  background: transparent;
  color: rgb(53, 134, 128);
  cursor: pointer;
  transition: all ease-in-out 0.25s;
  text-transform: uppercase;
  white-space: nowrap;
  outline: none;
  font-weight: 600;
  span.title {
    font-family: "Roboto", sans-serif !important;
    font-size: 14px !important;
  }
  &:hover {
    background: rgb(19, 48, 64);
  }
  i {
    margin-left: 8px;
  }
  svg {
    margin-left: 8px;
    fill: rgb(53, 134, 128);
    width: 14px;
    height: 14px;
  }
}
</style>
