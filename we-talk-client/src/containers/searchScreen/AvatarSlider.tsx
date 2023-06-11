import React, {
  useCallback, useLayoutEffect, useState, useEffect,
} from 'react';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import AvatarRound from '../../components/chat/AvatarRound';
import { getRandomAvatarNameLoreleiIndex, AvatarNameLorelei } from '../../constants';
import getAvatarImgUri from '../../utils/avatar';

const AvatarSlider = ({ setIndex }: {
  setIndex: (index: number) => void,
}) => {
  const [avatarIndex, setAvatarIndex] = useState<number>(getRandomAvatarNameLoreleiIndex());
  const [avatarUri, setAvatarUri] = useState<string>('');

  useLayoutEffect(() => {
    setAvatarUri(getAvatarImgUri(AvatarNameLorelei[avatarIndex]));
  }, [avatarIndex]);

  useEffect(() => {
    setIndex(avatarIndex);
  }, [avatarIndex, setIndex]);

  const onLeftClick = useCallback(() => {
    setAvatarIndex((i) => {
      if (i === 0) {
        return AvatarNameLorelei.length - 1;
      }
      return i - 1;
    });
  }, []);

  const onRightClick = useCallback(() => {
    setAvatarIndex((i) => {
      if (i === AvatarNameLorelei.length - 1) {
        return 0;
      }
      return i + 1;
    });
  }, []);
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
    }}
    >
      <CaretLeftOutlined
        style={{
          fontSize: '80px',
          cursor: 'pointer',
        }}
        onClick={() => {
          onLeftClick();
        }}
      />
      <AvatarRound imgUri={avatarUri} />
      <CaretRightOutlined
        style={{
          fontSize: '80px',
          cursor: 'pointer',
        }}
        onClick={() => {
          onRightClick();
        }}
      />
    </div>
  );
};

export default React.memo(AvatarSlider);
