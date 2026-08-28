import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ArrowDown, ArrowUp, ExternalLink, Sparkles } from 'lucide-react';
import {
  immersiveVideo,
  phaseCopy,
  sceneTimings,
  type JourneyPhase,
  type SceneKey,
  type SceneTiming,
} from '../data/immersiveJourney';

gsap.registerPlugin(Observer);

type WorkItem = {
  title: string;
  type: string;
  description: string;
  tags: string[];
  cover: string;
  category?: string;
};

type Segment = {
  start: number;
  end: number;
  hold: number;
  loop?: boolean;
};

type VideoRef = RefObject<HTMLVideoElement | null>;

type ImmersiveJourneyProps = {
  works: WorkItem[];
  interactiveMode: boolean;
  onEnterPortfolio: () => void;
};

const phaseOrder: JourneyPhase[] = ['garden', 'computer', 'sky'];
const phaseScene: Record<JourneyPhase, SceneKey> = {
  garden: 'gardenLoop',
  computer: 'computerApproach',
  sky: 'skyTravel',
};

function resolveSegment(timing: SceneTiming, duration: number): Segment {
  const start = timing.startSeconds ?? duration * timing.startRatio;
  const end = timing.endSeconds ?? duration * timing.endRatio;
  const safeStart = Math.max(0, Math.min(start, Math.max(duration - 0.08, 0)));
  const safeEnd = Math.max(safeStart + 0.12, Math.min(end, duration));
  const holdOffset = timing.holdOffset ?? 0;
  const hold = Math.max(safeStart, safeEnd - holdOffset);

  return {
    start: safeStart,
    end: safeEnd,
    hold,
    loop: timing.loop,
  };
}

function getVideoPair(
  activeIndex: number,
  refs: [VideoRef, VideoRef],
) {
  const activeRef = refs[activeIndex];
  const nextIndex = activeIndex === 0 ? 1 : 0;
  const nextRef = refs[nextIndex];
  return { activeRef, nextRef, nextIndex };
}

export function ImmersiveJourney({ works, interactiveMode, onEnterPortfolio }: ImmersiveJourneyProps) {
  const rootRef = useRef<HTMLElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const cardDeckRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);
  const phaseRef = useRef<JourneyPhase>('garden');
  const activeVideoIndexRef = useRef(0);
  const observerRef = useRef<Observer | null>(null);
  const [phase, setPhase] = useState<JourneyPhase>('garden');
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPlayingScene, setIsPlayingScene] = useState(false);

  const cards = useMemo(() => works.slice(0, 6), [works]);

  const segments = useMemo(() => {
    if (!duration) {
      return null;
    }

    return {
      garden: resolveSegment(sceneTimings.gardenLoop, duration),
      computer: resolveSegment(sceneTimings.computerApproach, duration),
      sky: resolveSegment(sceneTimings.skyTravel, duration),
    };
  }, [duration]);

  const setVideoToFrame = useCallback((video: HTMLVideoElement | null, time: number) => {
    if (!video || Number.isNaN(time)) {
      return;
    }

    video.pause();
    video.currentTime = Math.max(0, time);
  }, []);

  const fadeToVideo = useCallback((nextIndex: number) => {
    const current = activeVideoIndexRef.current === 0 ? videoARef.current : videoBRef.current;
    const next = nextIndex === 0 ? videoARef.current : videoBRef.current;

    activeVideoIndexRef.current = nextIndex;
    gsap.killTweensOf([current, next]);
    gsap.set(next, { autoAlpha: 1 });
    gsap.to(current, { autoAlpha: 0, duration: 0.42, ease: 'power2.out' });
  }, []);

  const playGardenLoop = useCallback(() => {
    if (!segments) {
      return;
    }

    const refs: [VideoRef, VideoRef] = [videoARef, videoBRef];
    const { nextRef, nextIndex } = getVideoPair(activeVideoIndexRef.current, refs);
    const video = nextRef.current;
    const segment = segments.garden;

    if (!video) {
      return;
    }

    setIsPlayingScene(false);
    video.pause();
    video.loop = false;
    video.currentTime = segment.start;
    const loopHandler = () => {
      if (video.currentTime >= segment.end - 0.04) {
        video.currentTime = segment.start;
        void video.play();
      }
    };

    video.ontimeupdate = loopHandler;
    fadeToVideo(nextIndex);
    void video.play().catch(() => undefined);
  }, [fadeToVideo, segments]);

  const revealSkyCards = useCallback(() => {
    const deck = cardDeckRef.current;
    if (!deck) {
      return;
    }

    const items = gsap.utils.toArray<HTMLElement>('.immersive-mission-card', deck);
    const center = Math.floor(items.length / 2);

    gsap.killTweensOf(items);
    gsap.set(deck, { autoAlpha: 1 });
    gsap.set(items, {
      autoAlpha: 0,
      x: 0,
      y: 120,
      scale: 0.78,
      rotation: 0,
      transformOrigin: '50% 50%',
      force3D: true,
    });

    const timeline = gsap.timeline();
    timeline
      .to(items[center], {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.72,
        ease: 'back.out(1.7)',
      })
      .to(
        items,
        {
          autoAlpha: 1,
          x: (index) => (index - center) * 154,
          y: (index) => Math.abs(index - center) * 24,
          rotation: (index) => (index - center) * 4.5,
          scale: 1,
          duration: 0.82,
          ease: 'power3.out',
          stagger: { amount: 0.28, from: 'center' },
        },
        '>-0.08',
      )
      .to(items, {
        y: '+=-8',
        duration: 2.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.12, from: 'center' },
      });
  }, []);

  const hideSkyCards = useCallback(() => {
    const deck = cardDeckRef.current;
    if (!deck) {
      return;
    }

    const items = gsap.utils.toArray<HTMLElement>('.immersive-mission-card', deck);
    gsap.killTweensOf(items);
    gsap.to(items, {
      autoAlpha: 0,
      y: 80,
      scale: 0.82,
      duration: 0.28,
      ease: 'power2.in',
      stagger: 0.025,
    });
    gsap.to(deck, { autoAlpha: 0, duration: 0.32, delay: 0.1 });
  }, []);

  const jumpToPhase = useCallback((target: JourneyPhase) => {
    if (!segments) {
      return;
    }

    const refs: [VideoRef, VideoRef] = [videoARef, videoBRef];
    const { nextRef, nextIndex } = getVideoPair(activeVideoIndexRef.current, refs);
    const video = nextRef.current;
    const segment = segments[target];

    if (!video) {
      return;
    }

    video.ontimeupdate = null;
    setVideoToFrame(video, target === 'garden' ? segment.start : segment.hold);
    fadeToVideo(nextIndex);

    phaseRef.current = target;
    setPhase(target);
    setIsPlayingScene(false);

    if (target === 'garden') {
      hideSkyCards();
      window.setTimeout(playGardenLoop, 80);
    } else if (target === 'sky') {
      revealSkyCards();
    } else {
      hideSkyCards();
    }
  }, [fadeToVideo, hideSkyCards, playGardenLoop, revealSkyCards, segments, setVideoToFrame]);

  const playScene = useCallback((target: JourneyPhase) => {
    if (!segments || lockRef.current) {
      return;
    }

    const targetIndex = phaseOrder.indexOf(target);
    const currentIndex = phaseOrder.indexOf(phaseRef.current);
    const forward = targetIndex > currentIndex;

    if (!forward || reducedMotion) {
      jumpToPhase(target);
      return;
    }

    const refs: [VideoRef, VideoRef] = [videoARef, videoBRef];
    const { nextRef, nextIndex } = getVideoPair(activeVideoIndexRef.current, refs);
    const video = nextRef.current;
    const segment = segments[target];

    if (!video) {
      return;
    }

    lockRef.current = true;
    setIsPlayingScene(true);
    hideSkyCards();
    phaseRef.current = target;
    setPhase(target);

    video.pause();
    video.loop = false;
    video.ontimeupdate = null;
    video.currentTime = segment.start;
    fadeToVideo(nextIndex);

    const complete = () => {
      video.pause();
      video.currentTime = segment.hold;
      video.ontimeupdate = null;
      lockRef.current = false;
      setIsPlayingScene(false);
      if (target === 'sky') {
        revealSkyCards();
      }
    };

    video.ontimeupdate = () => {
      if (video.currentTime >= segment.hold - 0.025) {
        complete();
      }
    };

    void video.play().catch(() => {
      complete();
    });
  }, [fadeToVideo, hideSkyCards, jumpToPhase, reducedMotion, revealSkyCards, segments]);

  const goNext = useCallback(() => {
    const index = phaseOrder.indexOf(phaseRef.current);
    if (index < phaseOrder.length - 1) {
      playScene(phaseOrder[index + 1]);
    }
  }, [playScene]);

  const goPrev = useCallback(() => {
    const index = phaseOrder.indexOf(phaseRef.current);
    if (index > 0) {
      jumpToPhase(phaseOrder[index - 1]);
    }
  }, [jumpToPhase]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    document.body.classList.add('immersive-active');
    return () => {
      document.body.classList.remove('immersive-active');
    };
  }, []);

  useEffect(() => {
    const video = videoARef.current;
    if (!video) {
      return undefined;
    }

    const onLoaded = () => {
      setDuration(video.duration || 1);
      setReady(true);
    };

    video.addEventListener('loadedmetadata', onLoaded);
    if (video.readyState >= 1) {
      onLoaded();
    }

    return () => video.removeEventListener('loadedmetadata', onLoaded);
  }, []);

  useEffect(() => {
    if (ready && segments) {
      gsap.set(videoARef.current, { autoAlpha: 1 });
      gsap.set(videoBRef.current, { autoAlpha: 0 });
      playGardenLoop();
    }
  }, [playGardenLoop, ready, segments]);

  useEffect(() => {
    if (!ready || !rootRef.current) {
      return undefined;
    }

    observerRef.current?.kill();
    observerRef.current = Observer.create({
      target: rootRef.current,
      type: 'wheel,touch,pointer',
      preventDefault: true,
      tolerance: 16,
      onDown: goNext,
      onUp: goPrev,
    });

    return () => {
      observerRef.current?.kill();
      observerRef.current = null;
    };
  }, [goNext, goPrev, ready]);

  const copy = phaseCopy[phase];

  return (
    <section
      ref={rootRef}
      id="home"
      className="fixed inset-0 z-[80] h-screen w-screen overflow-hidden bg-[#0f1226] text-white"
      aria-label="Immersive AI portfolio journey"
    >
      <video
        ref={videoARef}
        className="absolute inset-0 h-full w-full object-cover"
        src={immersiveVideo.src}
        poster={immersiveVideo.poster}
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={videoBRef}
        className="absolute inset-0 h-full w-full object-cover opacity-0"
        src={immersiveVideo.src}
        poster={immersiveVideo.poster}
        muted
        playsInline
        preload="auto"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_0_34%,rgba(19,19,55,0.12)_58%,rgba(8,7,28,0.62)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent_28%,rgba(74,63,160,0.2)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.10)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="absolute left-5 top-5 z-10 flex items-center gap-3 rounded-full border border-white/45 bg-white/20 px-4 py-2 text-sm font-black text-white shadow-[0_12px_34px_rgba(72,55,160,.24)] backdrop-blur-md md:left-8 md:top-8">
        <img src="/assets/avatar/cat-logo.png" alt="" className="h-9 w-9 rounded-xl border border-white/60 object-cover" />
        <span className="font-mono tracking-wide">Yuwen's AI Journey</span>
      </div>

      <div className="absolute left-5 top-24 z-10 max-w-[min(520px,calc(100vw-40px))] md:left-10 md:top-32">
        <p className="mb-3 inline-flex rounded-full border border-white/45 bg-white/20 px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
          {copy.label}
        </p>
        <h1
          data-phase-title
          className="max-w-xl font-mono text-[clamp(38px,6vw,86px)] font-black leading-none drop-shadow-[0_4px_0_rgba(65,53,150,.4)]"
        >
          {copy.title}
        </h1>
        <p className="mt-5 max-w-md text-base font-bold leading-8 text-white/88 md:text-lg">{copy.hint}</p>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/45 bg-white/25 px-4 py-3 text-xs font-black text-white shadow-[0_16px_44px_rgba(72,55,160,.26)] backdrop-blur-md md:text-sm">
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full bg-white/25 transition hover:-translate-y-1 hover:bg-white/40"
          aria-label="Previous scene"
          onClick={goPrev}
        >
        <ArrowUp size={17} />
        </button>
        <span>{isPlayingScene ? 'Playing scene...' : 'Scroll to travel'}</span>
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full bg-white/25 transition hover:translate-y-1 hover:bg-white/40"
          aria-label="Next scene"
          onClick={goNext}
        >
          <ArrowDown size={17} />
        </button>
      </div>

      <div
        ref={cardDeckRef}
        className="pointer-events-none absolute bottom-[130px] left-1/2 z-20 h-[320px] w-[min(1120px,100vw)] -translate-x-1/2 opacity-0"
        aria-hidden={phase !== 'sky'}
      >
        {cards.map((work, index) => (
          <article
            key={work.title}
            className="immersive-mission-card pointer-events-auto absolute left-1/2 top-0 w-[230px] overflow-hidden rounded-[18px] border border-white/60 bg-white/[0.82] text-[#403d9a] opacity-0 shadow-[0_18px_50px_rgba(77,61,161,.22)] backdrop-blur-md transition duration-200 hover:-translate-y-3 hover:rotate-[-2deg] hover:scale-[1.04] md:w-[250px]"
            style={{ zIndex: 30 + index }}
          >
            <img src={work.cover} alt="" className="h-32 w-full object-cover" />
            <div className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[#eef1ff] px-2 py-1 text-[10px] font-black text-[#6570df]">
                  Mission {String(index + 1).padStart(2, '0')}
                </span>
                <Sparkles size={15} className="text-[#ff7fb3]" />
              </div>
              <h2 className="line-clamp-2 text-base font-black leading-snug">{work.title}</h2>
              <p className="line-clamp-3 text-xs font-bold leading-5 text-[#5d5aa9]">{work.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {work.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded-md bg-[#fff2fb] px-2 py-1 text-[10px] font-black text-[#7a72e4]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {phase === 'sky' ? (
        <button
          type="button"
          onClick={onEnterPortfolio}
          className="absolute bottom-[36px] right-5 z-30 inline-flex items-center gap-2 rounded-full border border-white/70 bg-[#ff7fb3] px-5 py-3 text-sm font-black text-white shadow-[0_18px_46px_rgba(255,127,179,.32)] transition hover:-translate-y-1 hover:scale-105 md:right-10"
        >
          Enter Portfolio
          <ExternalLink size={17} />
        </button>
      ) : null}

      {!ready ? (
        <div className="absolute inset-0 z-40 grid place-items-center bg-[#efe8ff] text-[#5d58c8]">
          <div className="rounded-full border border-[#d9cfff] bg-white/75 px-5 py-3 font-mono text-sm font-black shadow-lg">
            Loading immersive world...
          </div>
        </div>
      ) : null}
    </section>
  );
}
