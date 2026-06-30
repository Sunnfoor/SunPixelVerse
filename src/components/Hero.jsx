import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { hero, profile } from '../data/portfolio.js';

const abilityStats = [
  { label: 'AI Skill', value: 88 },
  { label: 'Coding', value: 78 },
  { label: 'Product', value: 82 },
  { label: 'Design', value: 80 },
  { label: 'Learning', value: 96 },
];

export function Hero() {
  return (
    <section className="hero-section section-full" id="home">
      <div className="sky-layer" aria-hidden="true">
        <span className="cloud cloud-one" />
        <span className="cloud cloud-two" />
        <span className="cloud cloud-three" />
      </div>

      <div className="section-inner hero-dashboard">
        <div className="hero-copy pixel-panel">
          <p className="kicker">
            <Sparkles size={16} />
            {hero.eyebrow}
          </p>
          <h1>{hero.title}</h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
          <p className="hero-intro">{hero.intro}</p>

          <div className="role-row" aria-label="Portfolio roles">
            <span>AI Developer</span>
            <span>AI Product Manager</span>
            <span>AI Designer</span>
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href="#works">
              Start Missions
              <ArrowRight size={17} />
            </a>
            <a className="button button-secondary" href={`mailto:${profile.email}`}>
              <Mail size={17} />
              Let&apos;s Connect
            </a>
          </div>
        </div>

        <div className="studio-window pixel-border" aria-label="Yuwen creator studio illustration">
          <img src={hero.image} alt="Pixel style AI creator studio with desk, laptop, robot, cat and camera" />
          <div className="status-badge">
            <span className="online-dot" />
            Creator Online
          </div>
          <div className="quest-note">Today&apos;s Quest: make things warmer with AI</div>
        </div>

        <div className="ability-board pixel-panel" aria-label="Ability stats">
          <div className="board-header">
            <span>Character Stats</span>
            <small>LV. 21</small>
          </div>
          {abilityStats.map((stat) => (
            <div className="ability-row" key={stat.label}>
              <span>{stat.label}</span>
              <div className="ability-track" aria-hidden="true">
                <span style={{ width: `${stat.value}%` }} />
              </div>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
