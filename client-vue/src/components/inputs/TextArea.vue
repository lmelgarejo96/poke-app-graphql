<template>
  <div class="input-box">
    <textarea
      v-model="field"
      @keyup="() => $emit('changed', field)"
      :placeholder="placeholder ? placeholder : ''"
      :type="type ? type : 'text'"
      :required="required ? required : false"
    />
    <small v-if="errorMessage" class="error-input">{{ errorMessage }}</small>
  </div>
</template>

<script>
export default {
  props: {
    vModel: String,
    type: String,
    placeholder: String,
    required: Boolean,
    errorMsg: String,
  },
  data() {
    return {
      field: this.vModel ? this.vModel : "",
    };
  },
  computed: {
    errorMessage() {
      if (this.required) {
        return !this.field
          ? this.errorMsg
            ? this.errorMsg
            : "Campo requerido"
          : "";
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.input-box {
  height: 100px;
  width: 100%;
  background: #fff;
  margin-bottom: 30px;
  position: relative;
  textarea {
    display: block;
    width: 100%;
    padding: 15px;
    outline: 1px solid rgba(0, 75, 134, 0.15);
    height: 100px;
    font-size: 14px;
    border: 0px;
    &::placeholder {
      font-size: 14px;
    }
  }
  .error-input {
    font-size: 12px;
    padding-left: 15px;
    position: absolute;
    display: inline-block;
    bottom: -19.5px;
    color: #af0000;
  }
}
</style>
