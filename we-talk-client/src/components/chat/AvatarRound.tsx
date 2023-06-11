/* eslint-disable arrow-body-style */
import { FC } from 'react';

interface OwnProps {
  imgUri: string,
  // eslint-disable-next-line react/require-default-props
  style?: React.CSSProperties
}
const AvatarRound:FC<OwnProps> = ({ imgUri, style }) => {
  return (
    <img
      src={imgUri}
      alt="img"
      style={style ?? {
        borderRadius: '100px',
        width: '150px',
        height: '150px',
        userSelect: 'none',
        // backgroundColor: 'red',
      }}
    />
  );
};

export default AvatarRound;
