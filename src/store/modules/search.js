// import Vue from 'vue';
import apiService from "@/services/index.js";

const state = () => ({
  history: [],
  foundVideos: [],
});

const mutations = {
  saveHistory(state, payload) {
    state.history.push(payload);
  },

  deleteHistory(state, index) {
    state.history.splice(index, 1);
  },

  setFoundVideos(state, payload) {
    state.foundVideos.splice(0);
    state.foundVideos.push(...payload);
  },
};

const actions = {
  async getFeatured() {
    try {
      const response = await apiService.getFeaturedVideos();
      return response;
    } catch (error) {
      const message = {
        msg: "Ocorreu um erro ao carregar os Videos iniciais",
      };
      console.log("Error:", message);
    }
  },

  async getHomeVideos(context, payload) {
    try {
      const response = await apiService.getHomePage();
      context.commit("setFoundVideos", response.data.items);
      return response;
    } catch (error) {
      const message = {
        msg: "Ocorreu um erro ao carregar os Videos iniciais",
      };
      console.log("Error:", message);
    }
  },

  async getSearch(context, payload) {
    try {
      const response = await apiService.getSearchVideos(payload);
      context.commit("setFoundVideos", response.data.items);
      context.commit("saveHistory", payload);
      return response;
    } catch (error) {
      const message = {
        msg: "Ocorreu um erro ao carregar os Videos pesquisados",
      };
      console.log("Error:", message);
    }
  },
};

const getters = {
  getHistory(state) {
    return state.history;
  },

  getFoundVideos(state) {
    return state.foundVideos;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
