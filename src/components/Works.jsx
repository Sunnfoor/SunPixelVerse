import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { filters, galleryItems, works } from '../data/portfolio.js';

export function Works() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedWork, setSelectedWork] = useState(null);
  const [lightboxItem, setLightboxItem] = useState(null);

  const visibleWorks = useMemo(() => {
    if (activeFilter === 'All') {
      return works;
    }

    return works.filter((work) => work.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!selectedWork && !lightboxItem) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedWork(null);
        setLightboxItem(null);
      }
    };

    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedWork, lightboxItem]);

  return (
    <section className="works-section reveal-section" id="works">
      <div className="section-inner projects-board">
        <div className="board-title">
          <h2>
            <span>✩</span>
            Selected Projects
          </h2>
          <a href="#contact">
            View All
            <ArrowRight size={17} />
          </a>
        </div>

        <div className="filter-menu" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              className={activeFilter === filter ? 'active' : ''}
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="project-row">
          {visibleWorks.map((work, index) => (
            <article className="project-card" key={work.title}>
              <button type="button" className="project-card-button" onClick={() => setSelectedWork(work)}>
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
            </article>
          ))}
        </div>
      </div>

      <div className="section-inner gallery-board" id="gallery">
        <div className="board-title">
          <h2>
            <span>✦</span>
            Life Gallery
          </h2>
          <p>Click to open archive</p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <button className="gallery-card" type="button" key={item.title} onClick={() => setLightboxItem(item)}>
              <img src={item.image} alt="" />
              <strong>{item.title}</strong>
              <span>{item.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedWork ? <MissionModal work={selectedWork} onClose={() => setSelectedWork(null)} /> : null}
      {lightboxItem ? <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} /> : null}
    </section>
  );
}

function MissionModal({ work, onClose }) {
  return (
    <div className="modal-layer" role="presentation" onMouseDown={onClose}>
      <article
        className="mission-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${work.title} details`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close project details">
          <X size={18} />
        </button>
        <img src={work.cover} alt="" />
        <div className="mission-detail">
          <p className="kicker">Mission Detail</p>
          <h2>{work.title}</h2>
          <div className="mission-meta-grid">
            <span>Status: {work.status}</span>
            <span>Difficulty: {work.difficulty}</span>
            <span>Role: {work.role}</span>
          </div>
          <p>{work.details}</p>
          <div className="detail-block">
            <strong>Tools</strong>
            <div className="tag-row">
              {work.tools.map((tool) => (
                <small key={tool}>{tool}</small>
              ))}
            </div>
          </div>
          <div className="detail-block">
            <strong>Outcome</strong>
            <p>{work.outcome}</p>
          </div>
        </div>
      </article>
    </div>
  );
}

function Lightbox({ item, onClose }) {
  return (
    <div className="modal-layer" role="presentation" onMouseDown={onClose}>
      <article
        className="lightbox-card"
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} gallery image`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close gallery image">
          <X size={18} />
        </button>
        <img src={item.image} alt="" />
        <h2>{item.title}</h2>
        <p>{item.caption}</p>
      </article>
    </div>
  );
}
