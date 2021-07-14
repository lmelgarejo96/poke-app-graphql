<template>
  <div class="input-file-wrapper">
    <div class="d-flex align-items-center">
      <!-- File Input -->
      <div class="button button-open rounded-md shadow-sm px-0">
        <!-- Replace the file input styles with our own via the label -->
        <input
          @change="updatePreview($refs)"
          ref="input"
          type="file"
          accept="image/*,capture=camera"
          name="photo"
          id="photo"
          class="custom"
        />
        <label
          for="photo"
          class="
            py-2
            px-3
            border border-gray-300
            rounded-md
            text-sm
            leading-4
            font-medium
            text-gray-700
            hover:text-indigo-500 hover:border-indigo-300
            focus:outline-none
            focus:border-indigo-300
            focus:shadow-outline-indigo
            active:bg-gray-50 active:text-indigo-800
            transition
            duration-150
            ease-in-out
          "
        >
          Elegir Imagen
        </label>
      </div>
      <div class="flex items-center text-sm text-gray-500 mx-2">
        <!-- Display the file name when available -->
        <span v-if="fileName">{{ fileName }}</span>
        <!-- Removes the selected file -->
        <button
          v-if="fileName"
          @click="clearPreview($refs)"
          type="button"
          aria-label="Remove image"
          class="mx-1 mt-1"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="x-circle w-4 h-4"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      fileName: "",
    };
  },
  methods: {
    updatePreview($refs) {
      const files = $refs.input.files;
      if (files && files.length > 0) {
        this.file = files[0];
        this.$emit("fileUploaded", {
          imageURL: this.fileName,
          file: this.file,
        });
      } else {
        this.file = null;
        this.$emit("fileUploaded", {
          imageURL: this.fileName,
          file: this.file,
        });
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewPhoto = e.target.result;
        this.fileName = files[0].name;
        this.$emit("fileUploaded", {
          imageURL: e.target.result,
          file: this.file,
        });
      };
      reader.readAsDataURL(files[0]);
    },
    clearPreview($refs) {
      $refs.input.value = null;
      this.file = null;
      this.fileName = false;
      this.$emit("fileUploaded", {
        imageURL: "",
        file: null,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.input-file-wrapper {
  height: 45px;
  color: rgba(255, 255, 255, 0.79);
  margin-bottom: 30px;
  .button-open {
    label {
      cursor: pointer;
      border: none !important;
    }
  }
  input[type="file"].custom {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute !important;
    white-space: nowrap;
    width: 1px;
    display: none !important;
  }
}
</style>
