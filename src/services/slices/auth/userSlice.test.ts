import { initialState, loginUserThunk, logoutUserThunk, updateUserThunk, userReduсer } from "./userSlice";

const mockUser = {
    email: 'email',
    name: 'name',
}

const mockUserResponse = {
  success: true,
  user: {
    email: 'email',
    name: 'name',
  }
}

describe(("Проверка авторизации"), () => {

  it('initial state', () => {
    const state = undefined;
    const action = {
      type: 'unknown',
    };
    expect(userReduсer(state, action)).toEqual(initialState);
});

  
  it('loginUserThunk pending', () => {
    const action = {
      type: loginUserThunk.pending.type
    };
    let state = {
      ...initialState
    };
    const newState = userReduсer(state, action );
    expect(newState.UserRequest).toBe(true);
    expect(newState.UserError).toBe(null);
  });

  it('loginUserThunk rejected', () => {
    const action = {
      type: loginUserThunk.rejected.type,
      payload: 'Неверные данные пользователя'
    }
    let state = {
      ...initialState,
      UserRequest: true
    }
    const newState = userReduсer(state, action );
    expect(newState.UserRequest).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.UserError).toBe('Неверные данные пользователя');
  });

  it('loginUserThunk fulfilled', () => {
    const state = { ...initialState, UserRequest: true };
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: mockUser
    };
    const newState = userReduсer(state, action);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.data).toEqual(mockUser);
    expect(newState.UserRequest).toBe(false);
  });

  it('registerUserThunk pending', () => {
    const action = {
      type: loginUserThunk.pending.type
    };

    const state = { ...initialState};
    const newState = userReduсer(state, action );
    expect(newState.UserRequest).toBe(true);
    expect(newState.UserError).toBe(null);
  });

  it('registerUserThunk rejected', () => {
    const action = {
      type: loginUserThunk.rejected.type,
      payload: 'Неверно'
    };

    const state = {
      ...initialState,
      UserRequest: true
    };

    const newState = userReduсer(state, action );
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.UserRequest).toBe(false);
    expect(newState.UserError).toBe('Неверно');
  });

  it('registerUserThunk fulfilled', () => {
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: mockUser
    };

    const state = {
      ...initialState,
      UserRequest : true
    };
    const newState = userReduсer(state, action);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.data).toEqual(mockUser);
    expect(newState.UserRequest).toBe(false);
  });

  it('getUserThunk pending', () => {
    const action = {
      type: loginUserThunk.pending.type
    }
    const state = { ...initialState};
    const newState = userReduсer(state, action );
    expect(newState.UserRequest).toBe(true);
    expect(newState.UserError).toBe(null);
  });

  it('getUserThunk rejected', () => {
    const action = {
      type: loginUserThunk.rejected.type,
      payload: 'Ошибка получения пользователя'
    };
    const state = { ...initialState, UserRequest: true };
    const newState = userReduсer(state, action );
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.UserRequest).toBe(false);
    expect(newState.UserError).toBe('Ошибка получения пользователя');
  });

  it('getUserThunk fulfilled', () => {
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: mockUserResponse
    };
    const state = { ...initialState, UserRequest: true };
    const newState = userReduсer(state, action);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.data).toEqual(mockUserResponse);
    expect(newState.UserRequest).toBe(false);
  });

  it('logoutUserThunk pending', () => { 
    const action = {
      type: logoutUserThunk.pending.type
    }
    const state = { ...initialState};
    const newState = userReduсer(state, action );
    expect(newState.UserRequest).toBe(true);
    expect(newState.UserError).toBe(null);
  }); 

  it('logoutUserThunk rejected', () => {
    const action = {
      type: logoutUserThunk.rejected.type,
      payload: 'Ошибка выхода'
    };
    const state = { ...initialState, UserRequest: true };
    const newState = userReduсer(state, action );
    expect(newState.UserRequest).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.UserError).toBe('Ошибка выхода');
  });

  it('logoutUserThunk fulfilled', () => {
    const action = {
      type: logoutUserThunk.fulfilled.type,
    };
    const state = { ...initialState, UserRequest: true };
    const newState = userReduсer(state, action);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.UserRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.data).toBeNull();
  });

  it('updateUserThunk pending', () => {
    const action = {
      type: updateUserThunk.pending.type
    }
    const state = { ...initialState};
    const newState = userReduсer(state, action );
    expect(newState.UserRequest).toBe(true);
    expect(newState.UserError).toBe(null);
  });

  it('updateUserThunk rejected', () => {
    const action = {
      type: updateUserThunk.rejected.type,
      payload: 'Ошибка обновления пользователя'
    }
    const state = { ...initialState, UserRequest: true };
    const newState = userReduсer(state, action );
    expect(newState.UserRequest).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.UserError).toBe('Ошибка обновления пользователя');
  });

  it('updateUserThunk fulfilled', () => {
    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: mockUserResponse
    }
    const state = { ...initialState, UserRequest: true };
    const newState = userReduсer(state, action);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.UserRequest).toBe(false);
    expect(newState.data).toEqual(mockUserResponse.user);
  });
});
