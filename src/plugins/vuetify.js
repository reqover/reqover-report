// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

const customLightTheme = {
  dark: false,
  colors: {
    warning: "#ffc107",
    error: "#dc3545",
    success: "#198754",
    info: "#0d6efd",
    primary: "#1967C0",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "customLightTheme",
    themes: {
      customLightTheme,
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
