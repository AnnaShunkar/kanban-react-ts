import type { ReactNode } from 'react';
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';
import { ConfirmModal } from '../modals/ConfirmModal';

export enum HomePageModalType {
  LOGIN = 'login',
  REGISTER = 'register',
  LOGIN_CONFIRM = 'loginConfirm',
  REGISTER_CONFIRM = 'registerConfirm',
}

export const getHomePageModalComponentMap = (
  setModalType: (type: HomePageModalType | null) => void,
): Record<HomePageModalType, ReactNode> => ({
  [HomePageModalType.LOGIN]: (
    <LoginModal onClose={() => setModalType(HomePageModalType.LOGIN_CONFIRM)} />
  ),
  [HomePageModalType.REGISTER]: (
    <RegisterModal
      onClose={() => setModalType(HomePageModalType.REGISTER_CONFIRM)}
    />
  ),
  [HomePageModalType.LOGIN_CONFIRM]: (
    <ConfirmModal
      title="Leave?"
      message="Close login modal?"
      onConfirm={() => setModalType(null)}
      onCancel={() => setModalType(HomePageModalType.LOGIN)}
    />
  ),
  [HomePageModalType.REGISTER_CONFIRM]: (
    <ConfirmModal
      title="Leave?"
      message="Close register modal?"
      onConfirm={() => setModalType(null)}
      onCancel={() => setModalType(HomePageModalType.REGISTER)}
    />
  ),
});
