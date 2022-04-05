import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import store from "./store";

import Button from "primevue/button";
import Card from "primevue/card";
import Chip from "primevue/chip";
import Dialog from "primevue/dialog";
import Galleria from "primevue/galleria";
import Image from "primevue/image";
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";
import OverlayPanel from "primevue/overlaypanel";
import Paginator from "primevue/paginator";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "./index.css";

createApp(App)
  .use(PrimeVue, { ripple: true })
  .use(store)
  .use(ToastService)

  .component("Button", Button)
  .component("Card", Card)
  .component("Chip", Chip)
  .component("Dialog", Dialog)
  .component("Galleria", Galleria)
  .component("Image", Image)
  .component("InputText", InputText)
  .component("Menubar", Menubar)
  .component("OverlayPanel", OverlayPanel)
  .component("Paginator", Paginator)
  .component("Toast", Toast)

  .mount("#app");
