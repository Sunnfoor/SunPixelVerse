import { useEffect, useState } from 'react';
import { Home, Mail, Package, PawPrint, Sparkles, Star, UsersRound } from 'lucide-react';
import { navItems, profile } from '../data/portfolio.js';

const navIconMap = {
  '#home': Home,
  '#about': UsersRound,
  '#works': Sparkles,
  '#strengths': Package,
  '#contact': Mail,
};

export function Navbar() {
  const [activeHref, setActiveHref] = useState('#home');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: '-24% 0px -58% 0px', threshold: [0.08, 0.24, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand-mark" href="#home" aria-label="Back to home">
          <img src={profile.catLogo} alt="" />
          <strong>{profile.portfolio}</strong>
          <Sparkles size={15} />
        </a>

        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = navIconMap[item.href] ?? Star;
            return (
              <a
                key={item.href}
                href={item.href}
                className={activeHref === item.href ? 'active' : ''}
              >
                <Icon size={17} />
                {item.label}
              </a>
            );
          })}
        </div>

        <a className="nav-contact" href={`mailto:${profile.email}`}>
          Contact Me
          <PawPrint size={18} />
        </a>
      </nav>
    </header>
  );
}
