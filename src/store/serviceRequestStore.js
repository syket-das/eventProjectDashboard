import axios from 'axios';
import { create } from 'zustand';

export const useServiceRequestStore = create((set) => ({
  serviceRequests: [],
  serviceRequest: {},

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

  getServiceRequest: async (serviceRequestId) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/serviceRequest/${serviceRequestId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      await set({
        serviceRequest: data.serviceRequest,
      });
    } catch (error) {
      await set({
        serviceRequest: {},
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
