import { BookOpenText, Mail, MessageCircle } from 'lucide-react';
import { profile } from '../data/portfolio.js';

export function Contact() {
  return (
    <section className="contact-section section-full" id="contact">
      <div className="section-inner save-point pixel-panel">
        <div className="camp-visual" aria-hidden="true">
          <span className="camp-fire" />
          <span className="camp-star one" />
          <span className="camp-star two" />
          <span className="camp-star three" />
        </div>

        <p className="kicker">Save Point / Let&apos;s Connect</p>
        <h2>Let&apos;s Build Something Together.</h2>
        <p>期待与你一起创造有温度、有表达、有生命力的作品。</p>

        <div className="contact-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}>
            <Mail size={17} />
            Email Me
          </a>
          <a className="button button-secondary" href={profile.csdn.url} target="_blank" rel="noreferrer">
            <BookOpenText size={17} />
            CSDN Blog
          </a>
        </div>

        <div className="contact-meta">
          <span>{profile.email}</span>
          <span>
            <MessageCircle size={15} />
            {profile.wechat}
          </span>
          <span>{profile.csdn.label}</span>
        </div>

        <footer>© 2026 {profile.name}. Built as a cozy AI creator world.</footer>
      </div>
    </section>
  );
}
