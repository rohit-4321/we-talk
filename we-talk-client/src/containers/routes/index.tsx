import { useRoutes } from 'react-router-dom';
import SearchContainer from '../searchScreen';
import ChatScreen from '../chatScreen';

const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <SearchContainer />,
    },
    {
      path: '/chat',
      element: <ChatScreen />,
    },
  ]);
  return element;
};

export default Routes;
