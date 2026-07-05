import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Home, Mail, Package, PawPrint, Sparkles, Star, UsersRound } from 'lucide-react';
import { navItems, profile } from '../data/portfolio.js';
import { springy, usePrefersReducedMotion } from '../utils/animation.js';

const navIconMap = {
  '#home': Home,
  '#about': UsersRound,
  '#works': Sparkles,
  '#strengths': Package,
  '#contact': Mail,
};

export function Navbar({ interactiveMode, onToggleInteractiveMode }) {
  const [activeHref, setActiveHref] = useState('#home');
  const reducedMotion = usePrefersReducedMotion();

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
        <motion.a
          className="brand-mark"
          href="#home"
          aria-label="Back to home"
          whileHover={reducedMotion ? undefined : { y: -2, rotate: -1 }}
          whileTap={reducedMotion ? undefined : { scale: 0.96 }}
          transition={springy}
        >
          <img src={profile.catLogo} alt="" />
          <strong>{profile.portfolio}</strong>
          <Sparkles size={15} />
        </motion.a>

        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = navIconMap[item.href] ?? Star;
            const isActive = activeHref === item.href;

            return (
              <motion.a
                key={item.href}
                href={item.href}
                className={isActive ? 'active' : ''}
                whileHover={reducedMotion ? undefined : { y: -3, scale: 1.05 }}
                whileTap={reducedMotion ? undefined : { scale: 0.94 }}
                transition={springy}
              >
                <Icon size={17} />
                {item.label}
                {isActive ? (
                  <motion.span className="nav-active-underline" layoutId="nav-active-underline" />
                ) : null}
              </motion.a>
            );
          })}
        </div>

        <div className="nav-actions">
          <motion.button
            className={interactiveMode ? 'nav-mode-toggle active' : 'nav-mode-toggle'}
            type="button"
            onClick={onToggleInteractiveMode}
            whileHover={reducedMotion ? undefined : { y: -2, scale: 1.04 }}
            whileTap={reducedMotion ? undefined : { scale: 0.92 }}
            transition={springy}
            aria-pressed={interactiveMode}
          >
            <Gamepad2 size={17} />
            {interactiveMode ? 'Mode On' : 'Mode Off'}
          </motion.button>
          <motion.a
            className="nav-contact"
            href={`mailto:${profile.email}`}
            whileHover={reducedMotion ? undefined : { y: -3, scale: 1.03 }}
            whileTap={reducedMotion ? undefined : { scale: 0.94 }}
            transition={springy}
          >
            Contact Me
            <PawPrint size={18} />
          </motion.a>
        </div>
      </nav>
    </header>
  );
}
