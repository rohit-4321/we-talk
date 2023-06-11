import {
  FC, useRef, useCallback,
} from 'react';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { InputBox, SearchScreenBackground } from './searchScreen.style';
import { userNameAtom } from '../../global';
import AvatarSlider from './AvatarSlider';

const SearchContainer: FC = () => {
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const avatarIndex = useRef(0);
  const setAvatarIndex = useCallback((index: number) => {
    avatarIndex.current = index;
  }, []);

  return (
    <SearchScreenBackground>
      <AvatarSlider setIndex={setAvatarIndex} />
      <InputBox>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <Link
          to="chat"
          state={{
            myName: userName,
            avatarIndex: avatarIndex.current,
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
