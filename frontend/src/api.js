import axios from 'axios';

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

    return axios.post(`/api/login/access-token`, params);
  },
  async getMe(token) {
    return axios.get(`/api/users/me`, authHeaders(token));
  },
  async updateMe(token, data) {
    return axios.put(`/api/users/me`, data, authHeaders(token));
  },
  async getUsers(token) {
    return axios.get(`/api/users/`, authHeaders(token));
  },
  async updateUser(token, userId, data) {
    return axios.put(`/api/users/${userId}`, data, authHeaders(token));
  },
  async createUser(token, data) {
    return axios.post(`/api/users/`, data, authHeaders(token));
  },
  async deleteUser(token, userId) {
    return axios.delete(`/api/users/${userId}`, authHeaders(token));
  },
  async recoverPassword(email) {
    return axios.post(`/api/recover-password/${email}`);
  },
  async resetPassword(new_password, token) {
    return axios.post(`/api/reset-password/`, {
      new_password,
      token,
    });
  },
};
