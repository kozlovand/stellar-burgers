import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  getOtherIngrediensSelector,
  getBun,
  clearIngredients
} from '../../services/slices/burger/constructorSlice';
import {
  clearOrder,
  getOrderRequestSelector,
  getOrderSelector,
  makeOrder
} from '../../services/slices/order/myOrderSlice';
import { useDispatch } from '../../services/store';
import { isAuthenticatedSelector } from '../../services/slices/auth/userSlice';
import { useNavigate } from 'react-router-dom';
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun: useSelector(getBun) || null,
    ingredients: useSelector(getOtherIngrediensSelector)
  };

  const orderRequest = useSelector(getOrderRequestSelector);

  const orderModalData = useSelector(getOrderSelector);
  const auth = useSelector(isAuthenticatedSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (auth) {
      const data = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item: TIngredient) => item._id),
        constructorItems.bun._id
      ];
      dispatch(makeOrder(data));
    } else {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(clearIngredients());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
