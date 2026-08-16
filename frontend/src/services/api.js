import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchGames = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.genre) params.append('genre', filters.genre);
    if (filters.platform) params.append('platform', filters.platform);
    if (filters.sort) params.append('sort', filters.sort);

    const response = await axios.get(`${API_URL}/games?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

export const fetchGameById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/games/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game:', error);
    throw error;
  }
};

export const fetchNews = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.featured) params.append('featured', filters.featured);

    const response = await axios.get(`${API_URL}/news?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const fetchNewsById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/news/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news article:', error);
    throw error;
  }
};
