import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpenText, Copy, Mail, MessageCircle } from 'lucide-react';
import { profile } from '../data/portfolio.js';
import { popItem, sectionReveal, springy, staggerParent, usePrefersReducedMotion } from '../utils/animation.js';

export function Contact({ interactiveMode }) {
  const [toast, setToast] = useState('');
  const [sparkles, setSparkles] = useState([]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToast(''), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const emitSparkles = (event) => {
    if (!interactiveMode || reducedMotion) {
      return;
    }

    const next = Array.from({ length: 8 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      x: event.clientX,
      y: event.clientY,
      dx: (index - 3.5) * 10,
      dy: -24 - (index % 4) * 8,
    }));

    setSparkles((current) => [...current, ...next]);
    window.setTimeout(() => {
      setSparkles((current) => current.filter((item) => !next.some((sparkle) => sparkle.id === item.id)));
    }, 720);
  };

  const copyText = async (event, label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`${label} copied ✦`);
    } catch {
      setToast(`Please copy ${label}: ${value}`);
    }

    emitSparkles(event);
  };

  return (
    <section className="contact-section reveal-section" id="contact">
      <motion.div
        className="section-inner save-point"
        variants={reducedMotion ? undefined : sectionReveal}
        initial={reducedMotion ? undefined : 'hidden'}
        whileInView={reducedMotion ? undefined : 'show'}
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div
          className="camp-visual"
          aria-hidden="true"
          animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="camp-fire" />
          <span className="camp-star one" />
          <span className="camp-star two" />
          <span className="camp-star three" />
        </motion.div>

        <motion.div
          variants={reducedMotion ? undefined : staggerParent}
          initial={reducedMotion ? undefined : 'hidden'}
          whileInView={reducedMotion ? undefined : 'show'}
          viewport={{ once: true }}
        >
          <motion.p className="kicker" variants={popItem}>Save Point / Let&apos;s Connect</motion.p>
          <motion.h2 variants={popItem}>Let&apos;s Build Something Together.</motion.h2>
          <motion.p variants={popItem}>期待与你一起创造有温度、有表达、有生命力的作品。</motion.p>

          <motion.div className="contact-actions" variants={popItem}>
            <motion.a
              className="btn btn-primary"
              href={`mailto:${profile.email}`}
              whileHover={reducedMotion ? undefined : { y: -5, scale: 1.04 }}
              whileTap={reducedMotion ? undefined : { scale: 0.94 }}
              transition={springy}
            >
              <Mail size={17} />
              Email Me
            </motion.a>
            <motion.a
              className="btn btn-secondary"
              href={profile.csdn.url}
              target="_blank"
              rel="noreferrer"
              whileHover={reducedMotion ? undefined : { y: -5, scale: 1.04 }}
              whileTap={reducedMotion ? undefined : { scale: 0.94 }}
              transition={springy}
            >
              <BookOpenText size={17} />
              CSDN Blog
            </motion.a>
          </motion.div>

          <motion.div className="contact-meta" variants={popItem}>
            <motion.button
              type="button"
              onClick={(event) => copyText(event, 'Email', profile.email)}
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.03 }}
              whileTap={reducedMotion ? undefined : { scale: 0.92 }}
              transition={springy}
            >
              <Copy size={15} />
              {profile.email}
            </motion.button>
            <motion.button
              type="button"
              onClick={(event) => copyText(event, 'WeChat', profile.wechat)}
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.03 }}
              whileTap={reducedMotion ? undefined : { scale: 0.92 }}
              transition={springy}
            >
              <MessageCircle size={15} />
              {profile.wechat}
            </motion.button>
            <span>{profile.csdn.label}</span>
          </motion.div>

          <motion.footer variants={popItem}>
            © 2026 {profile.chineseName}. Built as a cozy AI creator world.
          </motion.footer>
        </motion.div>
      </motion.div>

      <div className="sparkle-layer" aria-hidden="true">
        <AnimatePresence>
          {sparkles.map((sparkle) => (
            <motion.span
              className="click-sparkle"
              key={sparkle.id}
              initial={{ opacity: 1, x: sparkle.x, y: sparkle.y, scale: 0.4 }}
              animate={{
                opacity: 0,
                x: sparkle.x + sparkle.dx,
                y: sparkle.y + sparkle.dy,
                scale: 1.2,
                rotate: 90,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.72, ease: 'easeOut' }}
            >
              ✦
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {toast ? (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 18, x: '-50%', scale: 0.92 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 12, x: '-50%', scale: 0.94 }}
            transition={springy}
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
