import axios from 'axios';
import {apiUrl} from '@/env';

function authHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const api = {
  async loginGetToken(username, password) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return axios.post(`${apiUrl}/login/access-token`, params);
  },
  async getMe(token) {
    return axios.get(`${apiUrl}/users/me`, authHeaders(token));
  },
  async updateMe(token, data) {
    return axios.put(`${apiUrl}/users/me`, data, authHeaders(token));
  },
  async getUsers(token) {
    return axios.get(`${apiUrl}/users/`, authHeaders(token));
  },
  async updateUser(token, userId, data) {
    return axios.put(`${apiUrl}/users/${userId}`, data, authHeaders(token));
  },
  async createUser(token, data) {
    return axios.post(`${apiUrl}/users/`, data, authHeaders(token));
  },
  async deleteUser(token, userId) {
    return axios.delete(`${apiUrl}/users/${userId}`, authHeaders(token));
  },
  async recoverPassword(email) {
    return axios.post(`${apiUrl}/recover-password/${email}`);
  },
  async resetPassword(new_password, token) {
    return axios.post(`${apiUrl}/reset-password/`, {
      new_password,
      token,
    });
  },
};
