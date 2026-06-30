import { useEffect, useState } from 'react';
import { BookOpenText, Copy, Mail, MessageCircle } from 'lucide-react';
import { profile } from '../data/portfolio.js';

export function Contact() {
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToast(''), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const copyText = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`${label} copied`);
    } catch {
      setToast(`Please copy ${label}: ${value}`);
    }
  };

  return (
    <section className="contact-section reveal-section" id="contact">
      <div className="section-inner save-point">
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
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            <Mail size={17} />
            Email Me
          </a>
          <a className="btn btn-secondary" href={profile.csdn.url} target="_blank" rel="noreferrer">
            <BookOpenText size={17} />
            CSDN Blog
          </a>
        </div>

        <div className="contact-meta">
          <button type="button" onClick={() => copyText('Email', profile.email)}>
            <Copy size={15} />
            {profile.email}
          </button>
          <button type="button" onClick={() => copyText('WeChat', profile.wechat)}>
            <MessageCircle size={15} />
            {profile.wechat}
          </button>
          <span>{profile.csdn.label}</span>
        </div>

        <footer>© 2026 {profile.chineseName}. Built as a cozy AI creator world.</footer>
      </div>

      {toast ? <div className="toast" role="status">{toast}</div> : null}
    </section>
  );
}
