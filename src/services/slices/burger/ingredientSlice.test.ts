import { mock } from "node:test";
import { getIngredients, ingredientReduсer, initialState } from "./ingredientSlice";
import { configureStore } from "@reduxjs/toolkit";
import store from "../../store";
import { get } from "node:http";


const dataExample = [
  {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0
},
{
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: 0
},
]

describe(("Проверка ингредиентов"), () => {

  it("return the initial state", () => {
    expect(ingredientReduсer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  
  it('getIngredients pending', () => {
    const action = {
      type: getIngredients.pending.type
    }
    const newState = ingredientReduсer(initialState, action );

    expect(newState.isIngredientsLoading).toBe(true);
    expect(newState.error).toBe('');
  });

  it('getIngredients rejected', async () => {
    const mockResponse = ({
      success: false,
      message: 'error'
    });

    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      json: () => Promise.resolve(mockResponse)
    })) as jest.Mock;

    await store.dispatch(getIngredients());

    const { ingredients, isIngredientsLoading, error } = store.getState().ingredients;

    expect(ingredients).toEqual([]);
    expect(isIngredientsLoading).toBe(false);
    expect(error).toBe('error');
  });

  it('getIngredients fulfilled', async () => {
    const mockResponse = ({
      success: true,
      data: dataExample
    });

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })) as jest.Mock;

    await store.dispatch(getIngredients());

    const { ingredients, isIngredientsLoading, error } = store.getState().ingredients;

    expect(ingredients).toEqual(dataExample);
    expect(isIngredientsLoading).toBe(false);
    expect(error).toBe('');
  });
})
