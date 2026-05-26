import api from '../../services/api';

export const getDashboardData = async () => {
  return await api.get('/admin/dashboard');
};

export const getAllDonations = async () => {
  return await api.get('/admin/donations');
};

export const acceptDonation = async (id) => {
  return await api.put(`/admin/donation/${id}/accept`);
};

export const rejectDonation = async (id) => {
  return await api.put(`/admin/donation/${id}/reject`);
};

export const getAllReceivers = async () => {
  return await api.get('/admin/receivers');
};