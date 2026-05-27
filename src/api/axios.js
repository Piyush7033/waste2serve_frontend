import axios from "axios";

// ==========================================
// CREATE AXIOS INSTANCE
// ==========================================
const API = axios.create({
  baseURL: "https://waste2servebackend-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================
API.interceptors.request.use(

  (req) => {

    // ================= TOKEN =================
    const token = localStorage.getItem("token");

    console.log("🔑 TOKEN FROM LOCALSTORAGE:", token);

    // ================= ATTACH TOKEN =================
    if (token) {

      req.headers.Authorization = `Bearer ${token}`;

      console.log(
        "✅ AUTH HEADER ADDED:",
        req.headers.Authorization
      );

    } else {

      console.warn("❌ TOKEN NOT FOUND");

    }

    console.log(
      `➡️ API REQUEST: ${req.method?.toUpperCase()} ${req.url}`
    );

    return req;
  },

  (error) => {

    console.error("❌ REQUEST ERROR:", error);

    return Promise.reject(error);
  }

);

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================
API.interceptors.response.use(

  (response) => {

    console.log(
      `⬅️ API RESPONSE: ${response.config.url} | ${response.status}`
    );

    return response;
  },

  (error) => {

    console.error("❌ API ERROR DETAILS:");

    console.log("URL:", error.config?.url);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log("MESSAGE:", error.message);

    // ======================================
    // AUTH ERROR HANDLING
    // ======================================
    if (
      error.response?.status === 401 ||
      error.response?.status === 403
    ) {

      console.warn("🔐 AUTH ERROR DETECTED");

      console.log(
        "CURRENT TOKEN:",
        localStorage.getItem("token")
      );

      // OPTIONAL CLEAR
      // localStorage.removeItem("token");
      // localStorage.removeItem("user");
      // localStorage.removeItem("role");
    }

    return Promise.reject(error);
  }

);

export default API;