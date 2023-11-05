import axios from 'axios';
import { create } from 'zustand';

export const useServiceRequestStore = create((set) => ({
  serviceRequests: [],

  getServiceRequests: async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/serviceRequest/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      await set({
        serviceRequests: data.serviceRequests,
      });
    } catch (error) {
      await set({
        serviceRequests: [],
      });
    }
  },

  updateServiceRequest: async (serviceRequestId, body) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/serviceRequest/${serviceRequestId}/update`,
        {
          ...body,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (error) {}
  },
}));
