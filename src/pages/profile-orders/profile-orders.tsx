import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getMyOrdersSelector } from '../../services/slices/order/myOrderSlice';
import { getMyOrders } from '../../services/slices/order/myOrderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getMyOrdersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
