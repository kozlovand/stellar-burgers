import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { dataSelector } from '../../services/slices/auth/userSlice';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useSelector(dataSelector)?.name} />
);
