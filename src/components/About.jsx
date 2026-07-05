import { motion } from 'framer-motion';
import { BookOpenText, Mail, MessageCircle, NotebookTabs } from 'lucide-react';
import { about, profile, stats } from '../data/portfolio.js';
import { popItem, sectionReveal, springy, staggerParent, usePrefersReducedMotion } from '../utils/animation.js';

const findMe = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: MessageCircle, label: 'WeChat', value: profile.wechat },
  { icon: BookOpenText, label: 'CSDN', value: profile.csdn.label, href: profile.csdn.url },
  { icon: NotebookTabs, label: 'Portfolio', value: profile.portfolio },
];

const achievementIcons = ['pixel-robot', 'pixel-envelope', 'pixel-palette', 'pixel-star'];

export function About() {
  const reducedMotion = usePrefersReducedMotion();
  const viewport = { once: true, amount: 0.25 };

  return (
    <section className="about-section reveal-section" id="about">
      <div className="cloud-divider" aria-hidden="true" />
      <motion.div
        className="section-inner about-card paper-grid"
        variants={reducedMotion ? undefined : sectionReveal}
        initial={reducedMotion ? undefined : 'hidden'}
        whileInView={reducedMotion ? undefined : 'show'}
        viewport={viewport}
      >
        <motion.div
          className="polaroid"
          initial={reducedMotion ? undefined : { opacity: 0, rotate: -10, y: 32 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, rotate: -4, y: 0 }}
          whileHover={reducedMotion ? undefined : { rotate: -1, y: -8, scale: 1.035 }}
          transition={springy}
          viewport={viewport}
        >
          <span className="tape tape-top" />
          <img src={profile.avatar} alt="Yuwen pixel portrait" />
        </motion.div>

        <motion.div className="about-copy" variants={reducedMotion ? undefined : staggerParent}>
          <motion.h2 variants={reducedMotion ? undefined : popItem}>
            <span className="about-icon" aria-hidden="true">♡</span>
            About Me
          </motion.h2>
          <motion.p variants={reducedMotion ? undefined : popItem}>{about.text}</motion.p>
        </motion.div>

        <motion.div className="find-me" variants={reducedMotion ? undefined : staggerParent}>
          <motion.h2 variants={reducedMotion ? undefined : popItem}>Find Me</motion.h2>
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
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                variants={reducedMotion ? undefined : popItem}
                whileHover={reducedMotion ? undefined : { x: 7, scale: 1.02 }}
                whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              >
                {content}
              </motion.a>
            ) : (
              <motion.p
                key={item.label}
                variants={reducedMotion ? undefined : popItem}
                whileHover={reducedMotion ? undefined : { x: 7, scale: 1.02 }}
              >
                {content}
              </motion.p>
            );
          })}
        </motion.div>

        <motion.div className="achievements" variants={reducedMotion ? undefined : staggerParent}>
          <motion.h2 variants={reducedMotion ? undefined : popItem}>Achievements</motion.h2>
          <div className="achievement-grid">
            {stats.map((item, index) => (
              <motion.div
                className="achievement-card"
                key={item.label}
                data-note={item.note}
                tabIndex="0"
                variants={reducedMotion ? undefined : popItem}
                whileHover={reducedMotion ? undefined : { y: -7, scale: 1.025 }}
                whileFocus={reducedMotion ? undefined : { y: -7, scale: 1.025 }}
                transition={springy}
              >
                <strong>{item.value}</strong>
                <span className="achievement-label">{item.label}</span>
                <motion.span
                  className={`pixel-sticker ${achievementIcons[index]}`}
                  aria-hidden="true"
                  animate={reducedMotion ? undefined : { y: [0, -4, 0], rotate: [0, -2, 2, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.24, ease: 'easeInOut' }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <span className="paper-plane" aria-hidden="true" />
        <span className="corner-cat" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
