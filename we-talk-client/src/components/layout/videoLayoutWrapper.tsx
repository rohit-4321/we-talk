import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface VideoLayoutWrapperParams {
  children: [ReactNode, ReactNode]
}

const VideoLayoutSplit = styled.div`
display: flex;
flex-direction: column;
height: 100%;
`;
const VideoPane = styled.div`
flex: 1;
`;
const VideoLayoutWrapper:FC<VideoLayoutWrapperParams> = ({ children }) => {
  const [Video1, Video2] = children;
  return (
    <VideoLayoutSplit>
      <VideoPane>
        {Video1}
      </VideoPane>
      <VideoPane>
        {Video2}
      </VideoPane>
    </VideoLayoutSplit>
  );
};
export default VideoLayoutWrapper;
