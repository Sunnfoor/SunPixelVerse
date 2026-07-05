import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Mail, Star } from 'lucide-react';
import { hero, profile } from '../data/portfolio.js';
import { usePrefersReducedMotion } from '../utils/animation.js';

export function Hero({ interactiveMode }) {
  const stageRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !stageRef.current) {
      return undefined;
    }

    let removeScrollListener = () => {};

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .from('.hero-art', { scale: 1.035, duration: 0.9 })
        .from('.hero-copy > *', { y: 24, duration: 0.62, stagger: 0.08 }, '-=0.45')
        .from(
          '.note-paper, .neon-sign, .pixel-heart',
          { y: 18, scale: 0.88, duration: 0.5, stagger: 0.08 },
          '-=0.35',
        );

      gsap.to('.cloud-a', { x: 80, duration: 16, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.cloud-b', { x: -70, duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.floating-star', {
        scale: 1.45,
        opacity: 0.45,
        duration: 1.7,
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
        ease: 'sine.inOut',
      });
      gsap.to('.note-paper, .neon-sign, .pixel-heart', {
        y: -7,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        stagger: 0.22,
        ease: 'sine.inOut',
      });

      const onScroll = () => {
        const progress = Math.min(window.scrollY / 700, 1);
        gsap.to('.hero-art', { y: progress * 34, duration: 0.35, overwrite: true });
        gsap.to('.hero-copy', { y: progress * 18, duration: 0.35, overwrite: true });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      removeScrollListener = () => window.removeEventListener('scroll', onScroll);
    }, stageRef);

    return () => {
      removeScrollListener();
      context.revert();
    };
  }, [reducedMotion]);

  return (
    <section className="hero-section reveal-section" id="home">
      <div className={interactiveMode ? 'hero-stage interactive-on' : 'hero-stage'} ref={stageRef}>
        <img className="hero-art" src={hero.image} alt="Pastel pixel AI creator studio" />
        <div className="hero-overlay" />
        <div className="float-cloud cloud-a" aria-hidden="true" />
        <div className="float-cloud cloud-b" aria-hidden="true" />
        <span className="floating-star star-one" aria-hidden="true">✦</span>
        <span className="floating-star star-two" aria-hidden="true">✦</span>
        <span className="interactive-cursor" aria-hidden="true">▶</span>

        <div className="hero-copy">
          <h1>{hero.title}</h1>
          <p className="role-line">AI Developer · AI Product Manager · AI Designer</p>
          <div className="dash-line" />
          <p className="hero-cn">{hero.subtitle}</p>
          <p className="hero-cn">{hero.intro}</p>
          <div className="hero-actions">
            <motion.a
              className="btn btn-primary"
              href="#works"
              whileHover={reducedMotion ? undefined : { y: -5, scale: 1.04 }}
              whileTap={reducedMotion ? undefined : { scale: 0.95 }}
            >
              View My Works
              <Star size={17} />
            </motion.a>
            <motion.a
              className="btn btn-secondary"
              href={`mailto:${profile.email}`}
              whileHover={reducedMotion ? undefined : { y: -5, scale: 1.04 }}
              whileTap={reducedMotion ? undefined : { scale: 0.95 }}
            >
              Let&apos;s Connect
              <Mail size={17} />
            </motion.a>
          </div>
        </div>

        <span className="note-paper">Make things better with AI</span>
        <span className="neon-sign">KEEP GOING!</span>
        <span className="pixel-heart" />
      </div>
    </section>
  );
}
