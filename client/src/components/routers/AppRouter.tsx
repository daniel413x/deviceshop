import { observer } from 'mobx-react-lite';
import React, { Suspense, useContext } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import Context from '../../context/context';
import { IRouterRoute } from '../../types/types';
import LoadingScreen from '../LoadingScreen';

interface AppRouterProps {
  authedRoutes?: IRouterRoute[];
  publicRoutes?: IRouterRoute[];
  adminRoutes?: IRouterRoute[];
}

function AppRouter({
  publicRoutes,
  authedRoutes,
  adminRoutes,
}: AppRouterProps) {
  const { user } = useContext(Context);
  return (
    <Suspense fallback={<LoadingScreen router />}>
      <Routes>
        {user.isAdmin && adminRoutes?.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component key={`${path}`} />}
          />
        ))}
        {user.isRegistered && authedRoutes?.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component key={`${path}`} />}
          />
        ))}
        {publicRoutes?.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component key={`${path}`} />}
          />
        ))}
      </Routes>
    </Suspense>
  );
}

AppRouter.defaultProps = {
  publicRoutes: [],
  authedRoutes: [],
  adminRoutes: [],
};

export default observer(AppRouter);
