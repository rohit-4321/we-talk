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
        <Link
          to="chat"
          state={{
            myName: userName,
          }}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <button
            type="button"
            style={{
              width: '100%',
              height: '100%',
            }}
          >

            Search
          </button>

        </Link>
      </InputBox>
    </SearchScreenBackground>
  );
};

export default SearchContainer;
