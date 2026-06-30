import { about, profile, stats } from '../data/portfolio.js';

const profileFields = [
  ['Nickname', 'Sunfor_sun'],
  ['Class', 'AI Creator'],
  ['Title', 'Warm Pixel Builder'],
  ['Base', profile.location],
  ['Interests', 'Photography / Collage / Kpop / JP & KR'],
  ['Tools', 'Prompt / API / React / Python / Figma'],
];

const journeyNodes = [
  ['2023', 'CS Journey Start', '开始计算机科学与技术本科学习，打下工程基础。'],
  ['2024', 'AI App Practice', '完成 AI 大模型医疗问答助手，实践 API 调用与前端交互。'],
  ['2025', 'VR + LLM Trial', '探索 Unity3D、SteamVR 与 DeepSeek API 结合的虚拟导游系统。'],
  ['2026', 'Lookee Product Quest', '参与 AI 硬件产品验证与家长学习反馈页需求拆解。'],
];

export function About() {
  return (
    <section className="page-section about-section" id="about">
      <div className="section-inner section-heading">
        <p className="kicker">Journey / Character Profile</p>
        <h2>把 AI、产品、开发和生活灵感，整理成一张角色档案。</h2>
      </div>

      <div className="section-inner character-layout">
        <aside className="character-card pixel-panel">
          <div className="avatar-frame">
            <div className="pixel-avatar" aria-hidden="true">
              <span className="avatar-hair" />
              <span className="avatar-face" />
              <span className="avatar-blush left" />
              <span className="avatar-blush right" />
            </div>
          </div>

          <div className="character-title">
            <p>{profile.name}</p>
            <h3>{profile.role}</h3>
          </div>

          <div className="xp-card">
            <span>Growth EXP</span>
            <strong>84%</strong>
            <div className="xp-track">
              <span />
            </div>
          </div>

          <div className="profile-grid">
            {profileFields.map(([label, value]) => (
              <div key={label}>
                <small>{label}</small>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="story-panel pixel-panel">
          <p className="panel-label">Story Log</p>
          <p className="lead-text">{about.text}</p>

          <div className="highlight-list">
            {about.resumeHighlights.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>

          <div className="contact-strip" aria-label="Contact links">
            {about.contacts.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <Icon size={17} />
                  <span>
                    <strong>{item.label}</strong>
                    {item.value}
                  </span>
                </>
              );

              return item.href ? (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="section-inner stat-grid">
        {stats.map((item) => (
          <div className="stat-card pixel-panel" key={item.label}>
            <small>Achievement</small>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="section-inner journey-map pixel-panel">
        <p className="panel-label">Journey Map</p>
        <div className="timeline">
          {journeyNodes.map(([year, title, text]) => (
            <article className="timeline-node" key={year}>
              <span>{year}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
