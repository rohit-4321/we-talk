import { LoadingBox, LoadingContainer } from './loading.style';
import loadingSpinner from '../../assets/loadingSpinner.svg';

const LoadingScreen = () => (
  <LoadingContainer>
    <LoadingBox>
      <img src={loadingSpinner} alt="spinner" />
    </LoadingBox>
  </LoadingContainer>
);
export default LoadingScreen;
