<template>
  <div class="crud-buttons-list">
    <button title="Ver en Pokedex" @click="$emit('open')" type="button">
      <img src="../../assets/pokebola.png" alt="Pokebola">
    </button>
    <button title="Editar pokemon" @click="$emit('edit')" type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
      >
        <path
          d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"
        />
      </svg>
    </button>
    <button title="Eliminar pokemon" @click="$emit('remove')" type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
      >
        <path
          d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.crud-buttons-list {
  display: flex;
  button {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all ease-in-out 0.15s;
    border: 1px solid rgb(53, 134, 128);
    background: transparent;
    color: rgb(53, 134, 128);
    cursor: pointer;
    transition: all ease-in-out 0.25s;
    outline: none;
    margin-left: 3px;
    img {
      max-width: 35px;
    }
    &:hover {
      background: rgb(19, 48, 64);
    }
    &:first-of-type {
      margin-left: 0px;
    }
    svg {
      fill: rgb(53, 134, 128);
      width: 17px;
      height: 17px;
    }
  }
}
</style>
