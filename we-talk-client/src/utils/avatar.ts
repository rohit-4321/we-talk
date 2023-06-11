import { createAvatar } from '@dicebear/core';
import * as lorelei from '@dicebear/lorelei';

const getAvatarImgUri = (seed: string) => {
  const avatar = createAvatar(lorelei, {
    seed,
  });
  return avatar.toDataUriSync();
};

export default getAvatarImgUri;
