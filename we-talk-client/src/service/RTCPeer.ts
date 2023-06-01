import { RTC_SERVERS } from '../constants/index';

class RTCPeer {
  private static instance: RTCPeer;

  private peer: RTCPeerConnection;

  private constructor() {
    this.peer = new RTCPeerConnection(RTC_SERVERS);
  }

  public static getInstance(): RTCPeer {
    if (!RTCPeer.instance) {
      RTCPeer.instance = new RTCPeer();
    }
    return RTCPeer.instance;
  }

  public closeRTCPeer() {
    this.peer.close();
  }

  public addTracks(localStream: MediaStream) {
    localStream.getTracks().forEach(
      (track) => { this.peer.addTrack(track, localStream); },
    );
  }

  public addOnNegotiationNeededEvent(callback: (offer: RTCSessionDescription) => void) {
    const handlenegotiationneeded = () => {
      this.peer.createOffer()
        .then((offer) => {
          this.peer.setLocalDescription(offer)
            .then(() => {
              callback(this.peer.localDescription as RTCSessionDescription);
            })
            .catch((err) => {
              console.log('Error in setting up the offer', err);
            });
        })
        .catch((err) => {
          console.log('Error in setting up the offer', err);
        });
    };
    this.peer.addEventListener('negotiationneeded', handlenegotiationneeded);
    return () => {
      this.peer.removeEventListener('negotiationneeded', handlenegotiationneeded);
    };
  }

  public addOnIceCandidate(callback: (cad: RTCIceCandidate) => void) {
    const handleIceCandidate = (ev: RTCPeerConnectionIceEvent) => {
      if (ev.candidate) {
        callback(ev.candidate);
      }
    };
    this.peer.addEventListener('icecandidate', handleIceCandidate);
    return () => {
      this.peer.removeEventListener('icecandidate', handleIceCandidate);
    };
  }

  public addOnTrackEvent(callback: (ev: RTCTrackEvent) => void) {
    const handleOnTrack = (ev: RTCTrackEvent) => {
      callback(ev);
    };
    this.peer.addEventListener('track', handleOnTrack);
    return () => {
      this.peer.removeEventListener('track', handleOnTrack);
    };
  }

  public setRemoteOffer(offer: RTCSessionDescription): Promise<void> {
    const desc = new RTCSessionDescription(offer);
    return this.peer.setRemoteDescription(desc);
  }

  public getPeer() {
    return this.peer;
  }

  public getLocalDescription() {
    return this.peer.localDescription;
  }

  public addIceCandidate(cad: RTCIceCandidate) {
    const candidate = new RTCIceCandidate(cad);
    this.peer.addIceCandidate(candidate);
  }
}

export default RTCPeer;
