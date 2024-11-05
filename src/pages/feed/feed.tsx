import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { getOrdersSelector } from '../../services/slices/order/ordersSlice';
import { getOrders } from '../../services/slices/order/ordersSlice';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */

  const orders = useSelector(getOrdersSelector);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getOrders());
      }}
    />
  );
};
