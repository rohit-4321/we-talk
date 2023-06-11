export const SERVER_URL = 'http://localhost:3000';
export const RTC_SERVERS = {
  iceServers: [
    {
      urls: 'stun:stun.stunprotocol.org',
    },
    {
      urls: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com',
    },
  ],
};
export const AvatarNameLorelei = [
  'Bear',
  'Pepper',
  'Charlie',
  'Callie',
  'Bandit',
  'Gizmo',
  'Buddy',
  'Max',
  'Coco',
  'Dusty',
];

export function getRandomAvatarNameLoreleiIndex(): number {
  return Math.floor((Math.random()) * 100) % AvatarNameLorelei.length;
}
