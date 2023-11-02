import axios from 'axios';
import { create } from 'zustand';

export const useMaintainersStore = create((set) => ({
  maintainers: [],
  setMaintainers: async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/allMaintainers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      await set({
        maintainers: data.maintainers || [],
      });
    } catch (error) {
      await set({
        maintainers: [],
      });
    }
  },
}));
