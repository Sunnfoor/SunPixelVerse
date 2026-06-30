import { ArrowUpRight } from 'lucide-react';
import { works } from '../data/portfolio.js';

const difficulty = ['★★★★☆', '★★★★☆', '★★★☆☆', '★★★☆☆', '★★★☆☆', '★★★☆☆'];

const galleryItems = [
  ['Photo Diary', '日常、旅行与光影记录，后续可替换为你的摄影作品。'],
  ['Collage Desk', '拼贴、手写字、便签、票根和视觉实验的收纳处。'],
  ['Motion Mood', 'Kpop 舞蹈、舞台色彩和动态节奏带来的灵感板。'],
  ['Language Notes', '日语、韩语学习碎片和成长记录的小角落。'],
];

export function Works() {
  return (
    <section className="page-section works-section" id="works">
      <div className="section-inner section-heading">
        <p className="kicker">Missions / Selected Projects</p>
        <h2>每个作品都是一张任务卡，记录一次 AI 与产品能力的闯关。</h2>
        <p>
          这里保留了原来的 6 个项目数据，但把呈现方式改成 Mission Card：有状态、难度、角色和可继续替换的项目封面区。
        </p>
      </div>

      <div className="section-inner mission-grid">
        {works.map((work, index) => (
          <article className={`mission-card pixel-panel accent-${work.accent}`} key={work.title}>
            <div className="mission-cover">
              <span className="mission-index">Mission {String(index + 1).padStart(2, '0')}</span>
              <div className="mini-map" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="mission-body">
              <div className="mission-meta">
                <span>Status: Completed</span>
                <span>Difficulty: {difficulty[index]}</span>
              </div>
              <h3>{work.title}</h3>
              <p className="mission-type">{work.type}</p>
              <p>{work.description}</p>

              <div className="tag-row">
                {work.tags.map((tag) => (
                  <small key={tag}>{tag}</small>
                ))}
              </div>

              <a className="mission-link" href="#contact">
                Explore
                <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="section-inner gallery-section" id="gallery">
        <div className="section-heading compact-heading">
          <p className="kicker">Gallery / Life Archive</p>
          <h2>把生活方式也放进作品集，让个人品牌有记忆点。</h2>
        </div>

        <div className="gallery-grid">
          {galleryItems.map(([title, text], index) => (
            <article className="gallery-card pixel-panel" key={title}>
              <div className="gallery-visual" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <small>Archive {String(index + 1).padStart(2, '0')}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
