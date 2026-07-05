import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { profile } from '../data/portfolio.js';
import { usePrefersReducedMotion } from '../utils/animation.js';

gsap.registerPlugin(DrawSVGPlugin);

export function CatLoader() {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    document.body.classList.add('is-loading');

    if (reducedMotion) {
      const timeout = window.setTimeout(() => {
        document.body.classList.remove('is-loading');
        setVisible(false);
      }, 320);

      return () => {
        window.clearTimeout(timeout);
        document.body.classList.remove('is-loading');
      };
    }

    const closeLoader = () => {
      document.body.classList.remove('is-loading');
      setVisible(false);
    };
    const fallbackTimeout = window.setTimeout(closeLoader, 5200);

    const context = gsap.context(() => {
      gsap.set(root, { autoAlpha: 1 });
      gsap.set('.loader-cat-card', {
        autoAlpha: 0,
        scale: 1,
        y: 0,
        force3D: true,
        transformOrigin: '50% 50%',
      });
      gsap.set('.loader-pixel-star', {
        autoAlpha: 0,
        scale: 1,
        force3D: true,
        transformOrigin: '50% 50%',
      });
      gsap.set('.loader-draw-path', { drawSVG: '0% 0%' });

      const intro = gsap
        .timeline({
          defaults: { duration: 0.9, ease: 'power1.inOut' },
        })
        .set('#cat-svg-stage', { autoAlpha: 1 })
        .to('.loader-outline-path', { drawSVG: '0% 100%', stagger: 0.22, duration: 1.2 }, 0.05)
        .to('.loader-detail-path', { drawSVG: '0% 100%', stagger: 0.1, duration: 0.82 }, 1.08)
        .to('.loader-pixel-star', {
          autoAlpha: 1,
          rotation: 'random([-45, 45])',
          duration: 0.44,
          stagger: 0.08,
          ease: 'power1.inOut',
        }, 1.72)
        .to('.loader-cat-card', {
          autoAlpha: 1,
          duration: 0.78,
          ease: 'power1.inOut',
        }, 2.38)
        .to('.loader-draw-path', { drawSVG: '100% 100%', stagger: 0.05, duration: 0.82 }, 2.52)
        .to('.loader-pixel-star', { autoAlpha: 0, duration: 0.42, stagger: 0.04 }, 3.02)
        .to(root, {
          autoAlpha: 0,
          duration: 0.62,
          ease: 'power2.inOut',
          onComplete: () => {
            window.clearTimeout(fallbackTimeout);
            closeLoader();
          },
        }, 3.48);

      return () => {
        intro.kill();
      };
    }, root);

    return () => {
      window.clearTimeout(fallbackTimeout);
      context.revert();
      document.body.classList.remove('is-loading');
    };
  }, [reducedMotion]);

  if (!visible) {
    return null;
  }

  return (
    <div className="cat-loader" ref={rootRef} role="status" aria-label="Loading Yuwen's Portfolio">
      <div className="cat-loader-grid" aria-hidden="true" />
      <svg id="cat-svg-stage" className="cat-loader-lines" viewBox="0 0 420 420" aria-hidden="true">
        <defs>
          <linearGradient id="loaderLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8a1f" />
            <stop offset="50%" stopColor="#ff9fc7" />
            <stop offset="100%" stopColor="#b9a8ff" />
          </linearGradient>
        </defs>
        <path
          className="loader-draw-path loader-outline-path"
          d="M92 252 C72 200 84 151 123 119 L129 72 L178 110 C202 99 232 99 256 110 L306 72 L312 119 C351 151 363 201 342 253 C313 323 122 324 92 252"
        />
        <path
          className="loader-draw-path loader-outline-path"
          d="M134 86 L157 142"
        />
        <path
          className="loader-draw-path loader-outline-path"
          d="M299 86 L275 142"
        />
        <path
          className="loader-draw-path loader-detail-path"
          d="M138 224 H75 M139 246 H82 M280 224 H345 M279 246 H338"
        />
        <path
          className="loader-draw-path loader-detail-path"
          d="M175 216 C175 203 190 203 190 216 C190 231 175 231 175 216"
        />
        <path
          className="loader-draw-path loader-detail-path"
          d="M242 216 C242 203 257 203 257 216 C257 231 242 231 242 216"
        />
        <path
          className="loader-draw-path loader-detail-path"
          d="M210 238 L224 238 M217 242 C207 260 191 255 191 241 M217 242 C227 260 243 255 243 241"
        />
        <path
          className="loader-draw-path loader-detail-path"
          d="M278 129 C290 99 333 108 330 145 C322 177 282 171 278 129 M278 129 C263 102 225 114 239 148 C252 173 284 161 278 129"
        />
      </svg>

      <div className="loader-cat-card">
        <img src={profile.catLogo} alt="" />
      </div>

      <span className="loader-pixel-star star-a" />
      <span className="loader-pixel-star star-b" />
      <span className="loader-pixel-star star-c" />
      <span className="loader-pixel-star star-d" />
      <p>Loading Yuwen&apos;s Pixel World...</p>
    </div>
  );
}
