import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../utils/animation.js';

const flairTypes = [
  'trail-star',
  'trail-heart',
  'trail-robot',
  'trail-note',
  'trail-cat',
  'trail-flower',
  'trail-gem',
  'trail-paw',
  'trail-bow',
  'trail-spark',
  'trail-star',
  'trail-heart',
];

export function MouseTrail({ enabled }) {
  const rootRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (!root || !enabled || reducedMotion || isCoarsePointer) {
      return undefined;
    }

    const context = gsap.context(() => {
      const flair = gsap.utils.toArray('.trail-flair');
      const wrapper = gsap.utils.wrap(0, flair.length);
      const randomRotation = gsap.utils.random([-360, 360], true);
      const randomDrift = gsap.utils.random(-42, 42, 6, true);
      const gap = 92;
      const mousePos = { x: 0, y: 0, active: false };
      const lastMousePos = { x: 0, y: 0 };
      const cachedMousePos = { x: 0, y: 0 };
      let index = 0;

      gsap.set(flair, {
        autoAlpha: 0,
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        force3D: true,
        transformOrigin: '50% 50%',
      });

      const playAnimation = (shape) => {
        const drift = randomDrift();

        gsap.killTweensOf(shape);
        gsap.set(shape, {
          clearProps: 'transform,opacity,visibility',
        });
        gsap.set(shape, {
          autoAlpha: 1,
          x: cachedMousePos.x,
          y: cachedMousePos.y,
          xPercent: -50,
          yPercent: -50,
          scale: 0,
          rotation: 0,
          force3D: true,
        });

        return gsap.timeline({ defaults: { duration: 1, overwrite: 'auto' } })
          .fromTo(shape, {
            autoAlpha: 0,
            scale: 0,
          }, {
            autoAlpha: 1,
            scale: 'random(0.78, 1.16, 0.02)',
            ease: 'elastic.out(1, 0.3)',
          })
          .to(shape, {
            rotation: randomRotation(),
            x: cachedMousePos.x + drift,
          }, '<')
          .to(shape, {
            y: window.innerHeight + 96,
            autoAlpha: 0,
            ease: 'back.in(0.4)',
            duration: 1,
          }, 0);
      };

      const animateImage = () => {
        const img = flair[wrapper(index)];
        playAnimation(img);
        index += 1;
      };

      const onPointerMove = (event) => {
        mousePos.x = event.clientX;
        mousePos.y = event.clientY;

        if (!mousePos.active) {
          mousePos.active = true;
          lastMousePos.x = mousePos.x;
          lastMousePos.y = mousePos.y;
          cachedMousePos.x = mousePos.x;
          cachedMousePos.y = mousePos.y;
        }
      };

      const imageTrail = () => {
        if (!mousePos.active || document.hidden) {
          return;
        }

        const travelDistance = Math.hypot(
          lastMousePos.x - mousePos.x,
          lastMousePos.y - mousePos.y,
        );

        cachedMousePos.x = gsap.utils.interpolate(cachedMousePos.x, mousePos.x, 0.16);
        cachedMousePos.y = gsap.utils.interpolate(cachedMousePos.y, mousePos.y, 0.16);

        if (travelDistance > gap) {
          animateImage();
          lastMousePos.x = mousePos.x;
          lastMousePos.y = mousePos.y;
        }
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      gsap.ticker.add(imageTrail);

      return () => {
        window.removeEventListener('pointermove', onPointerMove);
        gsap.ticker.remove(imageTrail);
        gsap.killTweensOf(flair);
      };
    }, root);

    return () => context.revert();
  }, [enabled, reducedMotion]);

  return (
    <div className="mouse-trail-layer" ref={rootRef} aria-hidden="true">
      {flairTypes.map((type, index) => (
        <span className={`trail-flair ${type}`} key={`${type}-${index}`} />
      ))}
    </div>
  );
}
