import axios from 'axios';
import { create } from 'zustand';

export const useAgencyStore = create((set) => ({
  agencies: [],

  getAgencies: async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/agency/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      await set({
        agencies: data.agencies || [],
      });
    } catch (error) {
      await set({
        agencies: [],
      });
    }
  },
}));
