export type SceneKey = 'gardenLoop' | 'computerApproach' | 'skyTravel';
export type JourneyPhase = 'garden' | 'computer' | 'sky';

export type SceneTiming = {
  startRatio: number;
  endRatio: number;
  startSeconds?: number;
  endSeconds?: number;
  holdOffset?: number;
  loop?: boolean;
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const immersiveVideo = {
  src: asset('assets/videos/immersive-journey.mp4'),
  poster: asset('assets/hero/hero-pixel-studio.png'),
  catLogo: asset('assets/avatar/cat-logo.png'),
};

export const sceneTimings: Record<SceneKey, SceneTiming> = {
  gardenLoop: {
    startRatio: 0,
    endRatio: 0.32,
    loop: true,
  },
  computerApproach: {
    startRatio: 0.32,
    endRatio: 0.62,
    holdOffset: 0.04,
  },
  skyTravel: {
    startRatio: 0.62,
    endRatio: 1,
    holdOffset: 0.04,
  },
};

export const phaseCopy: Record<JourneyPhase, { label: string; title: string; hint: string }> = {
  garden: {
    label: 'Scene 01 / Garden Terminal',
    title: "Yuwen's AI Garden",
    hint: 'Scroll down to move closer to the glowing screen.',
  },
  computer: {
    label: 'Scene 02 / Screen Gate',
    title: 'Entering the AI Studio',
    hint: 'Scroll down again to pass through the cloud gate.',
  },
  sky: {
    label: 'Scene 03 / Sky Archive',
    title: 'Selected Missions in the Sky',
    hint: 'Projects unlocked. Explore the cards or enter the full portfolio.',
  },
};
