import React, { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  let textStyle = '';
  let text = '';
  switch (status) {
    case 'pending':
      textStyle = '#E52B1A';
      text = 'Готовится';
      break;
    case 'done':
      text = 'Выполнен';
      textStyle = '#00CCCC';
      break;
    default:
      text = 'Создан';
      textStyle = '#F2F2F3';
  }

  return <OrderStatusUI textStyle={textStyle} text={text} />;
};
