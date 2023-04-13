import * as React from 'react';
import { useEffect, useReducer } from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import {
  combinedReducer,
  getInitialState,
  reducerContext,
  useStore,
} from '../data';
import NavBar from './nav-bar';
import Player from './player';
import Players from './players';
import ScoresOverview from './scores-overview';
import Settings from './settings';

const Root: React.FC = () => {
  const { state } = useStore();
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    if (window.location.pathname === '/') {
      if (!state.gameInfo.hasVisitedSettingsPage) {
        navigate(`/settings`);
      } else {
        navigate(`/scores-overview`);
      }
    }
  }, [window.location.pathname]);

  return (
    <div className="content">
      {navigation.state === 'loading' ? (
        <div>Loading ...</div>
      ) : window.location.pathname === '/' ? (
        <div>Redirecting ...</div>
      ) : (
        <Outlet />
      )}
      <NavBar direction="horizontal" />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'players',
        element: <Players />,
      },
      {
        path: 'players/:playerId',
        element: <Player creatingNewPlayer={false} />,
      },
      { path: 'players/new', element: <Player creatingNewPlayer={true} /> },
      {
        path: 'scores-overview',
        element: <ScoresOverview />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);

const initialState = getInitialState();

const App: React.FC = () => {
  const [state, dispatch] = useReducer(combinedReducer, initialState);

  return (
    <reducerContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />
    </reducerContext.Provider>
  );
};

export default App;
