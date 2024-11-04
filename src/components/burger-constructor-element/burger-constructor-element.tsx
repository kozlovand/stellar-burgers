import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { useDispatch } from '../../services/store';
import {
  deleteIngredient,
  moveDown,
  moveUp
} from '../../services/slices/burger/constructorSlice';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveUp = () => {
      dispatch(moveUp(index));
    };

    const handleMoveDown = () => {
      dispatch(moveDown(index));
    };

    const handleClose = () => {
      dispatch(deleteIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
