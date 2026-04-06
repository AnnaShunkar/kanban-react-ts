import '../styles/main.css';
import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { AppRoute } from '../utils/routes';
import {
  getHomePageModalComponentMap,
  HomePageModalType,
} from '../components/auth/homePageModalMap';

export const HomePage: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeModalType, setActiveModalType] =
    useState<HomePageModalType | null>(null);

  const modalComponentMap = getHomePageModalComponentMap(setActiveModalType);

  useEffect(() => {
    if (user) {
      navigate(AppRoute.WORKSPACES);
    }
  }, [user, navigate]);

  return (
    <header>
      <h1>
        <span className="title-deco">KanBan</span> Board
      </h1>

      <p className="desritpion">
        KanBan Board helps teams visualize progress, limit work-in-progress
        (WIP), and identify bottlenecks, improving efficiency and communication.
      </p>

      {!activeModalType && (
        <div className="auth-section">
          <button
            type="button"
            className="auth-button"
            onClick={() => setActiveModalType(HomePageModalType.REGISTER)}
          >
            Registration
          </button>

          <button
            type="button"
            className="auth-button"
            onClick={() => setActiveModalType(HomePageModalType.LOGIN)}
          >
            Log in
          </button>
        </div>
      )}
      {activeModalType ? modalComponentMap[activeModalType] : null}
    </header>
  );
};
