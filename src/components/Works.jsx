import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { filters, galleryItems, works } from '../data/portfolio.js';
import { popItem, springy, staggerParent, usePrefersReducedMotion } from '../utils/animation.js';

gsap.registerPlugin(Draggable);

export function Works({ interactiveMode }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedWork, setSelectedWork] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [sparkles, setSparkles] = useState([]);
  const galleryRef = useRef(null);
  const cardsRef = useRef(null);
  const dragProxyRef = useRef(null);
  const loopApiRef = useRef({ next: () => {}, prev: () => {} });
  const isDraggingRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  const visibleWorks = useMemo(() => {
    if (activeFilter === 'All') {
      return works;
    }

    return works.filter((work) => work.category === activeFilter);
  }, [activeFilter]);

  const canLoop = visibleWorks.length > 1 && !reducedMotion;
  const lightboxItem = lightboxIndex === null ? null : galleryItems[lightboxIndex];

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    const cardsWrap = cardsRef.current;
    const proxy = dragProxyRef.current;

    loopApiRef.current = { next: () => {}, prev: () => {} };

    const compactLayout = window.matchMedia('(max-width: 900px)').matches;

    if (!gallery || !cardsWrap || !proxy || !canLoop || compactLayout) {
      return undefined;
    }

    const context = gsap.context(() => {
      let draggable;
      let settleTween;
      const cards = gsap.utils.toArray('.project-loop-card', cardsWrap);
      const state = { offset: 0 };
      const wrapCard = gsap.utils.wrap(-cards.length / 2, cards.length / 2);

      const getGap = () => {
        const cardWidth = cards[0]?.offsetWidth || 300;
        return gsap.utils.clamp(cardWidth * 1.22, cardWidth * 1.72, gallery.clientWidth * 0.24);
      };

      const renderCards = () => {
        const gap = getGap();

        cards.forEach((card, index) => {
          const distance = wrapCard(index - state.offset);
          const absDistance = Math.abs(distance);

          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: distance * gap,
            y: Math.min(absDistance, 2.2) * 18,
            scale: gsap.utils.clamp(0.42, 1, 1 - absDistance * 0.26),
            autoAlpha: gsap.utils.clamp(0.08, 1, 1 - absDistance * 0.34),
            rotation: distance * -2.4,
            zIndex: Math.round(100 - absDistance * 12),
            force3D: true,
          });
        });
      };

      const moveTo = (offset, snap = true) => {
        settleTween?.kill();
        settleTween = gsap.to(state, {
          offset: snap ? Math.round(offset) : offset,
          duration: snap ? 0.68 : 0.42,
          ease: snap ? 'power3.inOut' : 'power2.out',
          onUpdate: renderCards,
        });
      };

      gsap.set(cards, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        autoAlpha: 0,
        scale: 0,
        rotation: 0,
        force3D: true,
        transformOrigin: '50% 50%',
        willChange: 'transform, opacity',
      });

      renderCards();
      moveTo(0, false);

      draggable = Draggable.create(proxy, {
        type: 'x',
        trigger: gallery,
        cursor: 'grab',
        activeCursor: 'grabbing',
        onPress() {
          settleTween?.kill();
          this.startOffset = state.offset;
          gallery.classList.add('is-dragging');
          isDraggingRef.current = false;
          gsap.set(proxy, { x: 0 });
          this.update();
        },
        onDragStart() {
          isDraggingRef.current = true;
        },
        onDrag() {
          const cardWidth = cards[0]?.offsetWidth || 300;
          const dragDistance = gsap.utils.clamp(180, 360, cardWidth * 0.9);
          state.offset = this.startOffset - this.x / dragDistance;
          renderCards();
        },
        onDragEnd() {
          gallery.classList.remove('is-dragging');
          moveTo(state.offset);
          window.setTimeout(() => {
            isDraggingRef.current = false;
          }, 90);
        },
        onRelease() {
          gallery.classList.remove('is-dragging');
        },
      })[0];

      loopApiRef.current = {
        next: () => moveTo(state.offset + 1),
        prev: () => moveTo(state.offset - 1),
      };

      return () => {
        loopApiRef.current = { next: () => {}, prev: () => {} };
        isDraggingRef.current = false;
        draggable?.kill();
        settleTween?.kill();
        gsap.set(cards, { clearProps: 'all' });
      };
    }, gallery);

    return () => context.revert();
  }, [canLoop, visibleWorks]);

  useEffect(() => {
    if (!selectedWork && !lightboxItem) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedWork(null);
        setLightboxIndex(null);
      }

      if (lightboxItem && event.key === 'ArrowRight') {
        setLightboxIndex((current) => (current === null ? 0 : (current + 1) % galleryItems.length));
      }

      if (lightboxItem && event.key === 'ArrowLeft') {
        setLightboxIndex((current) => (
          current === null ? 0 : (current - 1 + galleryItems.length) % galleryItems.length
        ));
      }
    };

    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedWork, lightboxItem]);

  const emitSparkles = (event) => {
    if (!interactiveMode || reducedMotion) {
      return;
    }

    const next = Array.from({ length: 7 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      x: event.clientX,
      y: event.clientY,
      dx: (index - 3) * 12,
      dy: -22 - (index % 3) * 10,
    }));

    setSparkles((current) => [...current, ...next]);
    window.setTimeout(() => {
      setSparkles((current) => current.filter((item) => !next.some((sparkle) => sparkle.id === item.id)));
    }, 720);
  };

  return (
    <section className="works-section reveal-section" id="works">
      <motion.div
        className="section-inner projects-board"
        initial={reducedMotion ? undefined : { opacity: 0, y: 32 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="board-title">
          <h2>
            <span aria-hidden="true">✦</span>
            Selected Projects
          </h2>

          <div className="board-actions">
            <div className="carousel-controls" aria-label="Project loop controls">
              <motion.button
                aria-label="Previous project"
                className="carousel-button"
                disabled={!canLoop}
                onClick={() => loopApiRef.current.prev()}
                type="button"
                whileHover={reducedMotion ? undefined : { y: -3, scale: 1.06 }}
                whileTap={reducedMotion ? undefined : { scale: 0.9 }}
              >
                <ArrowLeft size={17} />
              </motion.button>
              <span>Project Loop</span>
              <motion.button
                aria-label="Next project"
                className="carousel-button"
                disabled={!canLoop}
                onClick={() => loopApiRef.current.next()}
                type="button"
                whileHover={reducedMotion ? undefined : { y: -3, scale: 1.06 }}
                whileTap={reducedMotion ? undefined : { scale: 0.9 }}
              >
                <ArrowRight size={17} />
              </motion.button>
            </div>

            <motion.a
              href="#contact"
              whileHover={reducedMotion ? undefined : { x: 5 }}
              whileTap={reducedMotion ? undefined : { scale: 0.95 }}
            >
              View All
              <ArrowRight size={17} />
            </motion.a>
          </div>
        </div>

        <div className="filter-menu" aria-label="Filter projects">
          {filters.map((filter) => (
            <motion.button
              className={activeFilter === filter ? 'active' : ''}
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.04 }}
              whileTap={reducedMotion ? undefined : { scale: 0.92 }}
              transition={springy}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        <div
          className={`project-loop-gallery ${canLoop ? 'loop-enabled' : 'loop-static'}`}
          ref={galleryRef}
        >
          <ul
            aria-label="Interactive project mission loop"
            className={`project-loop-cards ${canLoop ? 'loop-enabled' : 'loop-static'}`}
            ref={cardsRef}
          >
            {visibleWorks.map((work, index) => (
              <li className="project-loop-card" key={work.title}>
                <ProjectCard
                  index={index}
                  interactiveMode={interactiveMode}
                  onClick={(event) => {
                    if (isDraggingRef.current) {
                      event.preventDefault();
                      event.stopPropagation();
                      return;
                    }

                    emitSparkles(event);
                    setSelectedWork(work);
                  }}
                  reducedMotion={reducedMotion}
                  work={work}
                />
              </li>
            ))}
          </ul>

          <div className="drag-proxy" ref={dragProxyRef} aria-hidden="true" />
          {canLoop ? (
            <div className="loop-helper" aria-hidden="true">
              Drag cards or use arrows to browse missions
            </div>
          ) : null}
        </div>
      </motion.div>

      <motion.div
        className="section-inner gallery-board"
        id="gallery"
        initial={reducedMotion ? undefined : { opacity: 0, y: 32 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="board-title">
          <h2>
            <span aria-hidden="true">✦</span>
            Life Gallery
          </h2>
          <p>Click to open archive</p>
        </div>

        <motion.div
          className="gallery-grid"
          variants={reducedMotion ? undefined : staggerParent}
          initial={reducedMotion ? undefined : 'hidden'}
          whileInView={reducedMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.2 }}
        >
          {galleryItems.map((item, index) => (
            <motion.button
              className="gallery-card"
              type="button"
              key={item.title}
              onClick={(event) => {
                emitSparkles(event);
                setLightboxIndex(index);
              }}
              variants={reducedMotion ? undefined : popItem}
              whileHover={reducedMotion ? undefined : { y: -8, rotate: index % 2 ? 0.6 : -0.6, scale: 1.02 }}
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              transition={springy}
            >
              <img src={item.image} alt="" />
              <strong>{item.title}</strong>
              <span>{item.caption}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedWork ? <MissionModal work={selectedWork} onClose={() => setSelectedWork(null)} /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {lightboxItem ? (
          <Lightbox
            item={lightboxItem}
            onClose={() => setLightboxIndex(null)}
            onNext={() => setLightboxIndex((current) => (current === null ? 0 : (current + 1) % galleryItems.length))}
            onPrev={() => setLightboxIndex((current) => (
              current === null ? 0 : (current - 1 + galleryItems.length) % galleryItems.length
            ))}
          />
        ) : null}
      </AnimatePresence>
      <SparkleLayer sparkles={sparkles} />
    </section>
  );
}

function ProjectCard({ index, interactiveMode, onClick, reducedMotion, work }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const onPointerMove = (event) => {
    if (reducedMotion || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: y * -5, rotateY: x * 6 });
  };

  return (
    <motion.article
      className={interactiveMode ? 'project-card mission-glow' : 'project-card'}
      style={reducedMotion ? undefined : tilt}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      whileHover={reducedMotion ? undefined : { y: -10, scale: 1.025 }}
      transition={springy}
    >
      <button type="button" className="project-card-button" onClick={onClick}>
        <div className="project-cover">
          <img src={work.cover} alt="" />
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="project-body">
          <h3>{work.title}</h3>
          <p>{work.description}</p>
          <div className="tag-row">
            {work.tags.map((tag) => (
              <small key={tag}>{tag}</small>
            ))}
          </div>
        </div>
      </button>
    </motion.article>
  );
}

function MissionModal({ work, onClose }) {
  return (
    <motion.div
      className="modal-layer"
      role="presentation"
      onMouseDown={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.article
        className="mission-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${work.title} details`}
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={springy}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close project details">
          <X size={18} />
        </button>
        <motion.img src={work.cover} alt="" initial={{ scale: 1.06 }} animate={{ scale: 1 }} />
        <motion.div className="mission-detail" variants={staggerParent} initial="hidden" animate="show">
          <motion.p className="kicker" variants={popItem}>Mission Detail</motion.p>
          <motion.h2 variants={popItem}>{work.title}</motion.h2>
          <motion.div className="mission-meta-grid" variants={popItem}>
            <span>Status: {work.status}</span>
            <span>Difficulty: {work.difficulty}</span>
            <span>Role: {work.role}</span>
          </motion.div>
          <motion.p variants={popItem}>{work.details}</motion.p>
          <motion.div className="detail-block" variants={popItem}>
            <strong>Tools</strong>
            <div className="tag-row">
              {work.tools.map((tool) => (
                <small key={tool}>{tool}</small>
              ))}
            </div>
          </motion.div>
          <motion.div className="detail-block" variants={popItem}>
            <strong>Outcome</strong>
            <p>{work.outcome}</p>
          </motion.div>
        </motion.div>
      </motion.article>
    </motion.div>
  );
}

function Lightbox({ item, onClose, onNext, onPrev }) {
  return (
    <motion.div
      className="modal-layer"
      role="presentation"
      onMouseDown={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.article
        className="lightbox-card"
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} gallery image`}
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, rotate: -1.2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.94, rotate: 1 }}
        transition={springy}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close gallery image">
          <X size={18} />
        </button>
        <div className="lightbox-nav">
          <button type="button" onClick={onPrev} aria-label="Previous gallery image">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={onNext} aria-label="Next gallery image">
            <ArrowRight size={18} />
          </button>
        </div>
        <motion.img src={item.image} alt="" key={item.image} initial={{ opacity: 0.35 }} animate={{ opacity: 1 }} />
        <h2>{item.title}</h2>
        <p>{item.caption}</p>
      </motion.article>
    </motion.div>
  );
}

function SparkleLayer({ sparkles }) {
  return (
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
  );
}
