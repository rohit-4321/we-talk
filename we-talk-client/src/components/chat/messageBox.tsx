/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/no-array-index-key */
import {
  FC, useEffect, useMemo, useState,
} from 'react';
import { MessageContainer, RecipientMessageStyle, SelfMessageStyle } from './messageBox.style';
import { IChatMessage } from '../../global/chat';
import useScrollRef from '../../hooks/useScrollRef';
import MoreMessageArrow from './MoreMessageArrow';

const AUTO_SCROLL_THRESHOLD = 400;

interface MessageBoxProps {
  allMessage: IChatMessage[],
}

export const MessageBox: FC<MessageBoxProps> = ({
  allMessage,
}) => {
  const {
    ref,
    scrollBottom,
    scrollBottomUnderThreshold,
    onScrollEndListener,
  } = useScrollRef<HTMLDivElement>(AUTO_SCROLL_THRESHOLD);

  const [isDownArrowVisible, setDownArrowVisible] = useState(false);
  const [unseenMessageCount, setUnseenMessageCount] = useState(0);

  useEffect(() => {
    const scrollEndListenerCleanUp = onScrollEndListener(() => {
      setDownArrowVisible(false);
      setUnseenMessageCount(0);
    });
    return () => {
      scrollEndListenerCleanUp();
    };
  }, [onScrollEndListener]);

  useEffect(() => {
    scrollBottomUnderThreshold(() => {
      setDownArrowVisible(true);
      setUnseenMessageCount((count) => count + 1);
    }, () => {
      setDownArrowVisible(false);
      setUnseenMessageCount(0);
    });
  }, [allMessage, scrollBottomUnderThreshold]);

  const chatMessage = useMemo(() => (
    <>
      {
    allMessage.map((chatMsg, i) => (
      chatMsg.isSelf ? <SelfMessage key={i} message={chatMsg.message} />
        : <RecipientMessage message={chatMsg.message} key={i} />
    ))
  }
    </>
  ), [allMessage]);

  return (
    <div style={{
      position: 'relative',
      height: '100%',
    }}
    >
      {
        isDownArrowVisible && (
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            right: '10px',
          }}

        >
          <MoreMessageArrow onClick={scrollBottom} messageCount={unseenMessageCount} />
        </div>
        )
      }
      <MessageContainer ref={ref}>
        {chatMessage}
      </MessageContainer>
    </div>

  );
};

const SelfMessage: FC<{ message: string }> = ({ message }) => (
  <div style={{
    display: 'flex',
    margin: '7px 10px',
  }}
  >
    <SelfMessageStyle>{ message }</SelfMessageStyle>
  </div>
);

const RecipientMessage: FC<{ message: string }> = ({ message }) => (
  <div style={{
    display: 'flex',
    margin: '7px 10px',
  }}
  >
    <RecipientMessageStyle>{message}</RecipientMessageStyle>
  </div>
);

export default MessageBox;
