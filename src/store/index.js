import { createStore } from "vuex";

import search from "./modules/search.js";

export default createStore({
  modules: {
    search,
  },
});
