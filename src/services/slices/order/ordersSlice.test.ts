import { TOrder } from "@utils-types";
import { getOrder, getOrders, initialState, ordersReduсer } from "./ordersSlice";

export const exampleOrders = {
  success: true,
  orders: [
    {
      _id: '670f3476d829be001c77678d',
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093d"
      ],
      status: 'done',
      name: 'Краторный space бессмертный метеоритный бургер',
      createdAt: '2024-10-16T03:35:18.130Z',
      updatedAt: '2024-10-16T03:35:18.958Z',
      number: 59945
    },
    {
      _id: '670eeca0d829be001c776748',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-11-21T11:27:14.706Z',
      updatedAt: '2024-11-21T11:27:15.466Z',
      number: 59946
    }
  ],
  total: 2,
  totalToday: 2
};

export const exampleOrder = {
  success: true,
  orders: [ 
    {
      createdAt: "2024-11-21T11:27:14.706Z",
      ingredients:['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa093c'],
      name: "Краторный space бургер",
      number: 59943,
      status: "done",
      updatedAt: "2024-11-21T11:27:15.466Z",
      _id: "673f1912b27b06001c3e98b9"
    }
  ]
};

describe(("Проверка заказов"), () => {

  it("return the initial state", () => {
    expect(ordersReduсer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  
  it('getOrders pending', () => {
    const action = {
      type: getOrders.pending.type
    }
    const newState = ordersReduсer(initialState, action );

    expect(newState.ordersLoading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('getOrders rejected', () => {
    
    const action = {
      type: getOrders.rejected.type,
      payload: 'error'
    }
    const newState = ordersReduсer(initialState, action );

    expect(newState.ordersLoading).toBe(false);
    expect(newState.error).toBe('error');
  });

  it('getOrders fulfilled', () => {
    
    const action = {
      type: getOrders.fulfilled.type,
      payload: exampleOrders
    }
    const newState = ordersReduсer(initialState, action );

    expect(newState.orders).toEqual(exampleOrders.orders);
    expect(newState.total).toEqual(exampleOrders.total);
    expect(newState.totalToday).toEqual(exampleOrders.totalToday);
    expect(newState.ordersLoading).toBe(false);
  });
  it('getOrder pending', () => {
    const action = {
      type: getOrder.pending.type
    }
    const newState = ordersReduсer(initialState, action );

    expect(newState.ordersLoading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('getOrder rejected', () => {
    
    const action = {
      type: getOrder.rejected.type,
      payload: 'error'
    }
    const newState = ordersReduсer(initialState, action );  

    expect(newState.ordersLoading).toBe(false);
    expect(newState.error).toBe('error');
  });

  it('getOrder fulfilled', () => {
    
    const action = {
      type: getOrder.fulfilled.type,
      payload: exampleOrder
    }
    const newState = ordersReduсer(initialState, action);

    expect(newState.order).toEqual(exampleOrder.orders);
    expect(newState.ordersLoading).toBe(false);
  });
})
