import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CategoryData} from '../../utils';

interface CategoryState {
  categories: CategoryData[];
  categoryItems: any[];
}

const categorySlice = createSlice({
  name: 'Category',
  initialState: {
    categories: [],
    categoryItems: [],
  } as CategoryState,
  reducers: {
    addCategories: (state, action: PayloadAction<CategoryData>) => {
      state.categories.push(action.payload);
    },
    addCategoryItems: (state, action: PayloadAction<any>) => {
      state.categoryItems.push(action.payload);
    },
    setCategoryItems: (state, action: PayloadAction<any>) => {
      state.categoryItems = action.payload;
    },
    setCategories: (state, action: PayloadAction<any>) => {
      state.categories = action.payload;
    },
  },
});

const {actions, reducer} = categorySlice;

export const {
  setCategories,
  addCategories,
  addCategoryItems,
  setCategoryItems,
} = actions;

export default reducer;
