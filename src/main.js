import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./public-path.js";

createApp(App).use(vuetify).mount("#app");
