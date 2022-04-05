import axios from "axios";

const baseURL = "https://www.googleapis.com/youtube/v3";
const GOOGLE_API_KEY = "AIzaSyBsY4h7LC5c9ZWFyn2ChQM3Ls3wgd1hIHQ";
const apiService = {
  async getFeaturedVideos() {
    const response = await axios.get(`${baseURL}/search`, {
      headers: {
        Accept: "application/json",
      },
      params: {
        key: GOOGLE_API_KEY,
        part: "snippet",
        maxResults: 3,
        order: "viewCount",
        regionCode: "BR",
      },
    });
    return response;
  },

  async getHomePage() {
    const response = await axios.get(`${baseURL}/search`, {
      headers: {
        Accept: "application/json",
      },
      params: {
        key: GOOGLE_API_KEY,
        part: "snippet",
        maxResults: 16,
        order: "rating",
        regionCode: "BR",
        q: "vueJS",
      },
    });
    return response;
  },

  async getSearchVideos(payload) {
    const response = await axios.get(`${baseURL}/search`, {
      headers: {
        Accept: "application/json",
      },
      params: {
        key: GOOGLE_API_KEY,
        part: "snippet",
        maxResults: 16,
        order: "rating",
        regionCode: "BR",
        q: payload,
      },
    });
    return response;
  },
};

export default apiService;
