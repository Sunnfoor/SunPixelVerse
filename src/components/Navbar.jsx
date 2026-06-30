import { Backpack, Home, Mail, Map, Sparkles, Star, Trees } from 'lucide-react';
import { navItems, profile } from '../data/portfolio.js';

const navIconMap = {
  '#home': Home,
  '#about': Map,
  '#works': Backpack,
  '#strengths': Star,
  '#gallery': Trees,
  '#contact': Mail,
};

export function Navbar() {
  return (
    <header className="site-header">
      <nav className="nav-shell pixel-border" aria-label="Primary navigation">
        <a className="brand-mark" href="#home" aria-label="Back to home">
          <span className="brand-icon" aria-hidden="true">
            <Sparkles size={18} />
          </span>
          <span>
            <strong>{profile.portfolio}</strong>
            <small>AI Creator Dashboard</small>
          </span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = navIconMap[item.href] ?? Sparkles;

            return (
              <a key={item.href} href={item.href} className="pixel-menu-item">
                <Icon size={15} />
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
