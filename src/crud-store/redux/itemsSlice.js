import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    name: 'Laptop',
    description: 'A high-performance laptop suitable for gaming and professional work.',
  },
  {
    id: 2,
    name: 'Smartphone',
    description: 'A latest model smartphone with an excellent camera and battery life.',
  },
  {
    id: 3,
    name: 'Headphones',
    description: 'Noise-canceling headphones that provide high-quality sound and comfort.',
  },
];

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteItem: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
