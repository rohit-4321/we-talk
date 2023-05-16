import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { InputBox, SearchScreenBackground } from './searchScreen.style';

const SearchContainer: FC = () => {
  const [userName, setUserName] = useState('');
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
