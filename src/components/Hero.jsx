import { Mail, Star } from 'lucide-react';
import { hero, profile } from '../data/portfolio.js';

export function Hero() {
  return (
    <section className="hero-section reveal-section" id="home">
      <div className="hero-stage">
        <img className="hero-art" src={hero.image} alt="Pastel pixel AI creator studio" />
        <div className="hero-overlay" />
        <div className="float-cloud cloud-a" aria-hidden="true" />
        <div className="float-cloud cloud-b" aria-hidden="true" />
        <span className="floating-star star-one" aria-hidden="true">✦</span>
        <span className="floating-star star-two" aria-hidden="true">✧</span>

        <div className="hero-copy">
          <h1>{hero.title}</h1>
          <p className="role-line">AI Developer · AI Product Manager · AI Designer</p>
          <div className="dash-line" />
          <p className="hero-cn">{hero.subtitle}</p>
          <p className="hero-cn">{hero.intro}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#works">
              View My Works
              <Star size={17} />
            </a>
            <a className="btn btn-secondary" href={`mailto:${profile.email}`}>
              Let&apos;s Connect
              <Mail size={17} />
            </a>
          </div>
        </div>

        <span className="note-paper">Make things better with AI</span>
        <span className="neon-sign">KEEP GOING!</span>
        <span className="pixel-heart" />
      </div>
    </section>
  );
}
