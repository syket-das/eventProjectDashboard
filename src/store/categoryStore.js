import axios from 'axios';
import { create } from 'zustand';

export const useCategoryStore = create((set) => ({
  categories: [],
  category: {},

  getCategories: async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/category/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      await set({
        categories: data.categories || [],
      });
    } catch (error) {
      await set({
        categories: [],
      });
    }
  },

  createCategory: async (body) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/category/create`,
        {
          name: body.name,
          description: body.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      await set({
        category: data.category || {},
      });
    } catch (error) {
      await set({
        category: {},
      });
    }
  },
}));
