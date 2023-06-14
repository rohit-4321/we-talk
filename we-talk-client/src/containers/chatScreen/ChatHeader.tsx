import { useRecoilValue } from 'recoil';
import { useMemo } from 'react';
import AvatarRound from '../../components/chat/AvatarRound';
import { PostConnectInfoAtom, RecipientDataAtom } from '../../global/chat';
import getAvatarImgUri from '../../utils/avatar';
import ChatHeaderlayout from '../../components/layout/ChatHeaderLayout';

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
    <ChatHeaderlayout>
      <>
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

      </>
    </ChatHeaderlayout>
  );
};

export default ChatHeader;
