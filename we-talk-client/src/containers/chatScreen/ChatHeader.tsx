import { useRecoilValue } from 'recoil';
import { useMemo } from 'react';
import AvatarRound from '../../components/chat/AvatarRound';
import { PostConnectInfoAtom, RecipientDataAtom } from '../../global/chat';
import getAvatarImgUri from '../../utils/avatar';

const ChatHeader = () => {
  const recipientData = useRecoilValue(RecipientDataAtom);
  const postInfo = useRecoilValue(PostConnectInfoAtom);
  const avatarUri = useMemo(() => {
    if (postInfo) {
      return postInfo.info.avatar.seed;
    }
    return null;
  }, [postInfo]);
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        padding: '8px 10px',
      }}
    >
      <AvatarRound
        style={{
          borderRadius: '100px',
          width: '50px',
          height: '50px',
          userSelect: 'none',
        }}
        imgUri={avatarUri ? getAvatarImgUri(avatarUri) : ''}

      />
      <span>{recipientData !== null ? recipientData.recipientName : '-'}</span>
    </div>
  );
};

export default ChatHeader;
