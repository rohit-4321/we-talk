import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { RecoilRoot } from 'recoil';
import Routes from './routes';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className="App">
          <Routes />
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
