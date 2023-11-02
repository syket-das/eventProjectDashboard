import axios from 'axios';
import { create } from 'zustand';

export const useUsersStore = create((set) => ({
  users: [],
  setUsers: async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(data);

      await set({
        users: data.users || [],
      });
    } catch (error) {
      await set({
        user: [],
      });
    }
  },
}));
