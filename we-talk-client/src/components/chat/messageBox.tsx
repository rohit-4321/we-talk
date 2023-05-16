/* eslint-disable arrow-body-style */
import { FC } from 'react';
import { MessageContainer, RecipientMessageStyle, SelfMessageStyle } from './messageBox.style';

export const SelfMessage: FC = () => (
  <div style={{
    display: 'flex',
    margin: '7px 10px',
  }}
  >
    <SelfMessageStyle>Message Self</SelfMessageStyle>
  </div>
);

export const RecipientMessage: FC = () => (
  <div style={{
    display: 'flex',
    margin: '7px 10px',
  }}
  >
    <RecipientMessageStyle>Message Recipient</RecipientMessageStyle>
  </div>
);
export const MessageBox: FC = () => (
  <MessageContainer>
    {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 23, 23, 45, 53, 56].map((i) => {
        return i % 2 === 0 ? <SelfMessage key={i} /> : <RecipientMessage key={i} />;
      })
    }
  </MessageContainer>
);
