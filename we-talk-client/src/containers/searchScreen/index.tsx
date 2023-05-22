import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { InputBox, SearchScreenBackground } from './searchScreen.style';
import { userNameAtom } from '../../global';

const SearchContainer: FC = () => {
  const [userName, setUserName] = useRecoilState(userNameAtom);
  return (
    <SearchScreenBackground>
      <InputBox>
        <input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <button type="button">
          <Link
            to="chat"
            state={{
              myName: userName,
            }}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Search
          </Link>
        </button>
      </InputBox>
    </SearchScreenBackground>
  );
};

export default SearchContainer;
