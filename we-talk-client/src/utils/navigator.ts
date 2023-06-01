/* eslint-disable import/prefer-default-export */
export const askMedia = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  const clearMedia = () => {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  };
  return {
    stream,
    clearMedia,
  };
};
