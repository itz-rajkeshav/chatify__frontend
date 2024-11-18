import axios from 'axios';
import { API_URL } from '@/config.js';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL, // Replace with your API's base URL
  timeout: 10000, // Request timeout (optional)
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request config, e.g., add authorization header
    const token = localStorage.getItem('accessToken'); // Example: fetching token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Handle successful responses
//     return response.data; // Optionally, return only the data
//   },
//   (error) => {
//     // Handle errors globally
//     if (error.response) {
//       // Server responded with a status outside of 2xx
//       console.error('Response error:', error.response.data.message);
//       if (error.response.status === 401) {
//         // Example: redirect to login if unauthorized
//         window.location.href = '/login';
//       }
//     } else if (error.request) {
//       // No response was received from the server
//       console.error('Network error:', error.message);
//     } else {
//       // Something else happened
//       console.error('Error:', error.message);
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
