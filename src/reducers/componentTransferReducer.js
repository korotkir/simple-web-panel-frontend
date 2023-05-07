import { createSlice } from '@reduxjs/toolkit';

const componentTransferSlice = createSlice({
  name: 'reducer',
  initialState: {
    categoryList: [],
  },
  reducers: {
    addCategoryElement: (state, action) => {
      state.categoryList.push(action.payload);
    },
  },
});

export const { addCategoryElement } = componentTransferSlice.actions;

export default componentTransferSlice.reducer;