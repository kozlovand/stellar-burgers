import { configureStore} from "@reduxjs/toolkit";
import store, { rootReducer } from "./store"

describe('rootReducer', () => {
  it('should return the initial state', () => {
    const storeState = store.getState();
    expect(storeState).toEqual(rootReducer(undefined, { type: 'unknown' }))
  })
})
