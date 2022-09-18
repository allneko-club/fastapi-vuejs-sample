import axios from 'axios';
import { apiUrl } from '@/env';

function authHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const api = {
  async logInGetToken(username, password) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return axios.post(`${apiUrl}/api/login/access-token`, params);
  },
  async getMe(token) {
    return axios.get(`${apiUrl}/api/users/me`, authHeaders(token));
  },
  async updateMe(token, data) {
    return axios.put(`${apiUrl}/api/users/me`, data, authHeaders(token));
  },
  async getUsers(token) {
    return axios.get(`${apiUrl}/api/users/`, authHeaders(token));
  },
  async updateUser(token, userId, data) {
    return axios.put(`${apiUrl}/api/users/${userId}`, data, authHeaders(token));
  },
  async createUser(token, data) {
    return axios.post(`${apiUrl}/api/users/`, data, authHeaders(token));
  },
  async deleteUser(token, userId) {
    return axios.delete(`${apiUrl}/api/users/${userId}`, authHeaders(token));
  },
  async passwordRecovery(email) {
    return axios.post(`${apiUrl}/api/password-recovery/${email}`);
  },
  async updatePassword(password, token) {
    return axios.post(`${apiUrl}/api/reset-password/`, {
      new_password: password,
      token,
    });
  },
};
