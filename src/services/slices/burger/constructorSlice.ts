import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { getIngrediensSelector } from './ingredientSlice';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  otherIngredients: Array<TConstructorIngredient>;
};

const initialState: TConstructorState = {
  bun: null,
  otherIngredients: []
};

export const constructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.otherIngredients.push(action.payload);
        }
      },

      prepare: (ingredient: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredient, id: key } };
      }
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.otherIngredients = state.otherIngredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearIngredients: (state) => {
      state.otherIngredients = [];
      state.bun = null;
    },

    moveUp: (state, action: PayloadAction<number>) => {
      if (action.payload > 0) {
        state.otherIngredients.splice(
          action.payload,
          0,
          state.otherIngredients.splice(action.payload - 1, 1)[0]
        );
      }
    },

    moveDown: (state, action: PayloadAction<number>) => {
      if (action.payload < state.otherIngredients.length) {
        state.otherIngredients.splice(
          action.payload,
          0,
          state.otherIngredients.splice(action.payload + 1, 1)[0]
        );
      }
    }
  },
  selectors: {
    getBun: (state) => state.bun,
    getOtherIngrediensSelector: (state) => state.otherIngredients
  }
});

export const constructorReduсer = constructorSlice.reducer;
export const { getBun, getOtherIngrediensSelector } =
  constructorSlice.selectors;
export const {
  addIngredient,
  deleteIngredient,
  moveUp,
  moveDown,
  clearIngredients
} = constructorSlice.actions;
