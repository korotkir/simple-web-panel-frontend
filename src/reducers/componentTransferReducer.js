import { createSlice } from '@reduxjs/toolkit';

const componentTransferSlice = createSlice({
  name: 'reducer',
  initialState: {
    categoryList: [],
    menuElements: [],
  },
  reducers: {
    addCategoryElement: (state, action) => {
      state.categoryList.push(action.payload);
    },
    addMenuElements: (state, action) => {
      state.menuElements = action.payload
    }
  },
});

export const { addCategoryElement, addMenuElements } = componentTransferSlice.actions;

export default componentTransferSlice.reducer;