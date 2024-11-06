import axios from 'axios';

const API_URL = 'http://localhost:4000/api'; // Update with your backend URL

export const getPosts = () => axios.get(`${API_URL}/posts`);
export const getPostById = (id: string) => axios.get(`${API_URL}/posts/${id}`);
export const createPost = (data: any) => axios.post(`${API_URL}/posts`, data);
export const updatePost = (id: string, data: any) => axios.put(`${API_URL}/posts/${id}`, data);
export const deletePost = (id: string) => axios.delete(`${API_URL}/posts/${id}`);
