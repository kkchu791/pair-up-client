export const PLAY_AUDIO = "PLAY_AUDIO";

export const playAudio = (payload) => ({
  type: PLAY_AUDIO,
  isPlaying: payload.isPlaying,
});