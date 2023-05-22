import { useRoutes } from 'react-router-dom';
import SearchContainer from '../containers/searchScreen';
import ChatScreen from '../containers/chatScreen';

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
