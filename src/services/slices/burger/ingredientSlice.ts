import { getIngredientsApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { clearIngredients } from './constructorSlice';

interface ingredientsState {
  ingredients: TIngredient[];
  error: string | undefined;
  isIngredientsLoading: boolean;
}

export const initialState: ingredientsState = {
  ingredients: [],
  error: '',
  isIngredientsLoading: false
};

export const getIngredients = createAsyncThunk(
  'burger/ingredients',
  getIngredientsApi
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.error = '';
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.error = action.error.message;
        state.isIngredientsLoading = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
      });
  },
  selectors: {
    getIngrediensSelector: (state) => state.ingredients,
    loadingSelector: (state) => state.isIngredientsLoading
  }
});

export const ingredientReduсer = ingredientSlice.reducer;
export const { getIngrediensSelector, loadingSelector } =
  ingredientSlice.selectors;
