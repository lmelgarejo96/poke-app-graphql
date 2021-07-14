<template>
  <div class="input-search flex w-full mt-1">
    <div
      class="
        group
        |
        relative
        flex
        items-center
        |
        w-full
        h-11
        text-gray-400
        bg-white
        rounded-md
        |
        focus-within:text-gray-700
      "
    >
      <input
        type="text"
        autocomplete="off"
        name="search"
        v-model="kwrd"
        @keyup="keyPressed"
        placeholder="Search..."
        class="
          w-full
          px-14
          py-2
          |
          border border-gray-300
          rounded-md
          bg-white
          |
          placeholder-gray-400
          |
          focus:outline-none focus:ring-2 focus:bg-white
          |
          group-hover:border-gray-400
        "
      />
      <div
        class="
          icon-absolute
          top-px
          bottom-px
          left-px
          |
          ml-3
          |
          inline-flex
          items-center
          |
          border-r
          rounded-tl-md rounded-bl-md
          |
          bg-gray-50
          group-hover:text-gray-500
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5 text-gray-40"
        >
          <g>
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </g>
        </svg>
      </div>
      <button
        v-if="kwrd"
        title="Limpiar"
        type="reset"
        @click="clearFields"
        class="
          clear-absolute
          top-px
          right-px
          bottom-px
          |
          items-center
          justify-center
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kwrd: "",
      timeOutSearch: null
    };
  },
  methods: {
    keyPressed(ev) {
      if(this.timeOutSearch) {
        clearTimeout(this.timeOutSearch);
      }
      this.timeOutSearch = setTimeout(() => {
        this.$emit("updated", ev.target.value);
      }, 800);
    },
    clearFields() {
      this.kwrd = "";
      this.$emit("updated", "");
    },
  },
};
</script>

<style lang="scss" scoped>
.input-search {
  margin-top: 0px !important;
  position: relative;
  height: 42px;
  input {
    display: block;
    width: 100%;
    padding-left: 47px;
    outline: 1px solid rgba(0, 75, 134, 0.15);
    height: 42px;
    &::placeholder {
      font-size: 14px;
    }
  }
  .icon-absolute {
    position: absolute;
    top: 0;
    left: 0;
    width: 45px;
    height: 100%;
    background: rgba(209, 213, 219, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0px !important;
    svg {
      color: #3f3f46;
      height: 1.25rem;
      width: 1.25rem;
    }
  }
  .clear-absolute {
    position: absolute;
    top: 50%;
    right: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(209, 213, 219, 1);
    transform: translate(0%, -50%);
    padding: 0 !important;
    svg {
      fill: #fff !important;
      width: 8px;
      height: 8px;
    }
  }
}
</style>
