import { clear } from "console";
import { addIngredient, clearIngredients, constructorReduсer, deleteIngredient, initialState, moveDown, moveUp } from "./constructorSlice";

const mockIngredient1 = {
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
};
const mockIngredient2 = {
    _id: "643d69a5c3f7b9001cfa093e",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0
};

describe("Проверка конструктора", () => {
  it("addIngredient", () => {
    const action = {
      type: addIngredient.type,
      payload: mockIngredient1
    };

    const newState = constructorReduсer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      otherIngredients: [mockIngredient1]
    });
  });
  it("deleteIngredient", () => {
    const action = {
      type: deleteIngredient.type,
      payload: mockIngredient1
    };

    const newState = constructorReduсer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      otherIngredients: []
    });
  });
  it("moveUp", () => {
    const action = {
      type: moveUp.type,
      payload: 1
    };
    const state = {
      bun: null,
      otherIngredients: [{...mockIngredient1, id: '1'}, {...mockIngredient2, id: '2'}]
    };
    const newState = constructorReduсer(state, action);
    expect(newState).toEqual({
      bun: null,
      otherIngredients: [{...mockIngredient2, id: '2'}, {...mockIngredient1, id: '1'}]
    })
  });
  it("moveDown", () => {
    const action = {
      type: moveDown.type,
      payload: 0
    };
    const state = {
      bun: null,
      otherIngredients: [{...mockIngredient1, id: '1'}, {...mockIngredient2, id: '2'}]
    };
    const newState = constructorReduсer(state, action);
    expect(newState).toEqual({
      bun: null,
      otherIngredients: [{...mockIngredient2, id: '2'}, {...mockIngredient1, id: '1'}]
    })
  });
  it("clearIngredients", () => {
    const action = {
      type: clearIngredients.type,
    };
    const newState = constructorReduсer(initialState, action);
    expect(newState).toEqual({
      bun: null,
      otherIngredients: []
    })
  });
});
