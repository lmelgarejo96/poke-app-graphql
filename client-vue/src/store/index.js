import Vue from "vue";
import Vuex from "vuex";
import Swal from "sweetalert2";
import { abilities, species } from "../static/pokedex";
import config from "../config";
import axios from "axios";

axios.defaults.baseURL = config.HOST_URL + "/api";
axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        return error.response || error;
    }
);

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        abilities,
        species,
        loader: true,
    },
    getters: {
        getAbilities(state) {
            return state.abilities
        },
        getSpecies(state) {
            return state.species
        },
        getLoader(state) {
            return state.loader
        }
    },
    mutations: {
        setLoader(state, bool) {
            state.loader = bool;
        }
    },
    actions: {
        updateLoader({ commit }, bool) {
            commit("setLoader", bool);
        },
        // MESSAGE ERROR
        generateMessageStatus({}, { title = "", message = "", type = "success" }) {
            Swal.fire(title, message, type)
            return;
        },
        async generateConfirmDialog({}, { title = "", message = "¿Estás usted seguro de esto?", type = "warning", confirmColor = "#af0000", cancelColor = "#004b86", cancelMessage = "Cancelar", confirmMessage = "Si, quiero eliminar!" }) {
            const val = await Swal.fire({
                //title: `¿Está usted seguro de esto?`,
                text: message,
                icon: type,
                showCancelButton: true,
                confirmButtonColor: confirmColor,
                cancelButtonColor: cancelColor,
                confirmButtonText: confirmMessage,
                cancelButtonText: cancelMessage,
                showCloseButton: true,
            });
            return val.value;
        },
        async uploadFile({ dispatch }, file) {
            if (!file) return;
            const FORM = new FormData();
            FORM.append("image", file);
            const { data, status } = await axios.post("/uploads", FORM);
            if (status != 200) {
                await dispatch("generateMessageStatus", {
                    message: data.message ? data.message : 'No se pudo subir el archivo multimedia, vuelva a intentarlo',
                    type: "error"
                })
                return false;
            }
            if (!data.status) {
                await dispatch("generateMessageStatus", {
                    message: data.message,
                    type: "error"
                })
                return false;
            }
            return data.data;
        },
        async deleteFile({}, fileId) {
            const { data, status } = await axios.delete(`/uploads/${fileId}`, FORM);
            if (status != 200) return false;
            if (data.status != 200) return false;
            return true;
        },
    },
    modules: {},
});