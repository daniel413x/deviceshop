import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import Context from '../../context/context';
import { IRouterRoute } from '../../types/types';

interface AppRouterProps {
  authedRoutes?: IRouterRoute[];
  publicRoutes?: IRouterRoute[];
}

function AppRouter({
  publicRoutes,
  authedRoutes,
}: AppRouterProps) {
  const { user } = useContext(Context);
  return (
    <Routes>
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
  );
}

AppRouter.defaultProps = {
  publicRoutes: [],
  authedRoutes: [],
};

export default observer(AppRouter);
