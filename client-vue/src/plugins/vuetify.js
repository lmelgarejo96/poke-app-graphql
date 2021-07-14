import Vue from "vue";
import { es } from "vuetify/es5/locale";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);
export default new Vuetify({
    lang: {
        locales: { es },
        current: "es",
    },
    theme: {
        themes: {
            light: {
                primary: "#0a192f",
                secondary: "#358680",
                tertiary: "#d1d5db",
                primary_blue: "#1A4A84",
                hover: "#1A4A84",
                primary_green: "#00A39C",
                secondary_orange: "#FFB82C",
                light_blue: "#D5E9F2",
                light_green: "#AFEAE7",

                black: "#020100",
                white: "#FFFFFF",

                succes: "#FFB11A",
                info: "#FFB11A",
                warning: "#F9F62A",
                error: "#AF0000",
                disable_field: "#F4F5F7",
                disable_text: "#BDBBAC",
            },
        },
    },
});