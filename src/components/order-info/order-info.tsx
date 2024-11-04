import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { getOrdersSelector } from '../../services/slices/order/ordersSlice';
import { getIngrediensSelector } from '../../services/slices/burger/ingredientSlice';
import { useParams } from 'react-router-dom';
import { getMyOrdersSelector } from '../../services/slices/order/myOrderSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<string>();
  const orders = useSelector(getOrdersSelector);
  const myOrders = useSelector(getMyOrdersSelector);
  let currentOrder = orders.find(function (item) {
    return item.number === Number(number);
  });
  if (!currentOrder) {
    currentOrder = myOrders.find(function (item) {
      return item.number === Number(number);
    });
  }
  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = currentOrder;
  const ingredients: TIngredient[] = useSelector(getIngrediensSelector);
  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
