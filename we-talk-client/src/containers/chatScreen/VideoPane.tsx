/* eslint-disable arrow-body-style */
import React, { FC } from 'react';
import VideoLayoutWrapper from '../../components/layout/videoLayoutWrapper';

interface IVideoPaneProps {
  recipientStream: React.MutableRefObject<HTMLVideoElement | null>,
  myStream: React.MutableRefObject<HTMLVideoElement | null>
}
const VideoPane: FC<IVideoPaneProps> = ({
  recipientStream,
  myStream,
}) => {
  return (
    <VideoLayoutWrapper>
      <video
        style={{
          width: '400px',
          height: '400px',
        }}
        ref={myStream}
        muted
        autoPlay
      />
      <video
        style={{
          width: '400px',
          height: '400px',
        }}
        ref={recipientStream}
        muted
        autoPlay
      />
    </VideoLayoutWrapper>
  );
};
export default React.memo(VideoPane);
