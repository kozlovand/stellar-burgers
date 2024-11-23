import { clearOrder, getMyOrders, initialState, makeOrder, orderReduсer } from "./myOrderSlice";

const mockOrder= {
  name: "Флюоресцентный люминесцентный био-марсианский бургер",
  order: {
    createdAt: "2024-11-22T17:58:40.195Z",
    ingredients: [ 
      "643d69a5c3f7b9001cfa093d", 
      "643d69a5c3f7b9001cfa093e",
      "643d69a5c3f7b9001cfa0941",
      "643d69a5c3f7b9001cfa093d"
    ],
    name: "Флюоресцентный люминесцентный био-марсианский бургер",
    number: 60135,
    status: "done",
    updatedAt: "2024-11-22T17:58:41.214Z",
    _id: "6740c650b27b06001c3e9d07"
    },
  success: true
};
export const mockMyOrders = [
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
  ];

describe(("Проверка моих заказов"), () => {
  it('makeOrder pending', () => {
    const action = {
      type: makeOrder.pending.type
    }
    const newState = orderReduсer(initialState, action );
    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('makeOrder rejected', () => {
    const action = {
      type: makeOrder.rejected.type,
      payload: 'Ошибка оформления заказа'
    }
    const newState = orderReduсer(initialState, action );
    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe('Ошибка оформления заказа');
  });

  it('makeOrder fulfilled', () => {
    const action = {
      type: makeOrder.fulfilled.type,
      payload: mockOrder
    }
    const newState = orderReduсer(initialState, action);
    expect(newState.order).toEqual(mockOrder.order);
    expect(newState.orderRequest).toBe(false);
  });

  it('getMyOrders pending', () => {
    const action = {
      type: getMyOrders.pending.type
    }
    const newState = orderReduсer(initialState, action );
    expect(newState.ordersLoading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('getMyOrders rejected', () => {
    const action = {
      type: getMyOrders.rejected.type,
      payload: 'Ошибка получения заказов'
    }
    const newState = orderReduсer(initialState, action );
    expect(newState.ordersLoading).toBe(false);
    expect(newState.error).toBe('Ошибка получения заказов');
  });

  it('getMyOrders fulfilled', () => {
    const action = {
      type: getMyOrders.fulfilled.type,
      payload: mockMyOrders
    }
    const newState = orderReduсer(initialState, action );
    expect(newState.orders).toEqual(mockMyOrders);
    expect(newState.ordersLoading).toBe(false);
  });

  it('clearOrder', () => {
    const action = {
      type: clearOrder.type
    }
    const newState = orderReduсer(initialState, action );
    expect(newState.order).toBe(null);
  });
});

