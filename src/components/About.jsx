import { BookOpenText, Mail, MessageCircle, NotebookTabs } from 'lucide-react';
import { about, profile, stats } from '../data/portfolio.js';

const findMe = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: MessageCircle, label: 'WeChat', value: profile.wechat },
  { icon: BookOpenText, label: 'CSDN', value: profile.csdn.label, href: profile.csdn.url },
  { icon: NotebookTabs, label: 'Portfolio', value: profile.portfolio },
];

export function About() {
  return (
    <section className="about-section reveal-section" id="about">
      <div className="cloud-divider" aria-hidden="true" />
      <div className="section-inner about-card paper-grid">
        <div className="polaroid">
          <span className="tape tape-top" />
          <img src={profile.avatar} alt="Yuwen pixel portrait" />
        </div>

        <div className="about-copy">
          <h2>
            <span className="about-icon" aria-hidden="true">♣</span>
            About Me
          </h2>
          <p>{about.text}</p>
        </div>

        <div className="find-me">
          <h2>Find Me</h2>
          {findMe.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon size={17} />
                <span>
                  <strong>{item.label}: </strong>
                  {item.value}
                </span>
              </>
            );

            return item.href ? (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                {content}
              </a>
            ) : (
              <p key={item.label}>{content}</p>
            );
          })}
        </div>

        <div className="achievements">
          <h2>Achievements</h2>
          <div className="achievement-grid">
            {stats.map((item, index) => (
              <div className="achievement-card" key={item.label} data-note={item.note} tabIndex="0">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <i>{['🤖', '💌', '🎨', '⭐'][index]}</i>
              </div>
            ))}
          </div>
        </div>

        <span className="paper-plane">✈</span>
        <span className="corner-cat">🐱</span>
      </div>
    </section>
  );
}
