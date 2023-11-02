import axios from 'axios';
import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      await set({
        user: data || null,
        isAuthenticated: data?.id ? true : false,
      });
    } catch (error) {
      await set({
        user: null,
        isAuthenticated: false,
      });
    }
  },

  removeUser: () => set({}, true),
}));
