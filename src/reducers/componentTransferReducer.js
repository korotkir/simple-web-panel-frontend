import { createSlice } from '@reduxjs/toolkit';

const componentTransferSlice = createSlice({
  name: 'reducer',
  initialState: {
    categoryList: [],
    menuElements: [],
    deletedCategories: [],
  },
  reducers: {
    addCategoryElement: (state, action) => {
      state.categoryList.push(action.payload);
    },
    addMenuElements: (state, action) => {
      state.menuElements = action.payload
    },
    deletedCategories: (state, action) => {
      state.deletedCategories.push(action.payload)
    },
  },
});

export const { addCategoryElement, addMenuElements, deletedCategories } = componentTransferSlice.actions;

export default componentTransferSlice.reducer;