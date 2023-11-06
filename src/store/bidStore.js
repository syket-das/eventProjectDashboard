import axios from 'axios';
import { create } from 'zustand';

export const useBidStore = create((set) => ({
  bid: {},

  updateBid: async (id, data) => {
    try {
      const { data: bid } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/bid/${id}/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      await set({
        bid: bid || {},
      });
    } catch (error) {
      await set({
        bid: {},
      });
    }
  },
}));
