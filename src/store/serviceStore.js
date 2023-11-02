import axios from 'axios';
import { create } from 'zustand';

export const useServiceStore = create((set) => ({
  services: [],

  getServices: async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/service/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      await set({
        services: data.services || [],
      });
    } catch (error) {
      await set({
        services: [],
      });
    }
  },
}));
