import { strengths } from '../data/portfolio.js';

const branches = ['AI', 'Product', 'Frontend', 'Prompt', 'UX', 'Figma', 'React', 'Python'];

export function Strengths() {
  return (
    <section className="page-section strengths-section" id="strengths">
      <div className="section-inner section-heading">
        <p className="kicker">Skill Tree</p>
        <h2>不是堆图标，而是一棵 AI 创作者的复合技能树。</h2>
        <p>技能点围绕 AI 实践、产品判断、视觉表达和工程落地展开，适合 AI 开发 / AI 产品经理 / AI 设计方向展示。</p>
      </div>

      <div className="section-inner skill-tree pixel-panel">
        <div className="tree-core">
          <span>Core</span>
          <strong>AI Creator</strong>
        </div>

        <div className="branch-row" aria-label="Skill branches">
          {branches.map((branch, index) => (
            <span style={{ '--delay': `${index * 80}ms` }} key={branch}>
              {branch}
            </span>
          ))}
        </div>

        <div className="strengths-grid">
          {strengths.map((item, index) => (
            <article className="strength-card" key={item.title} style={{ '--node': index + 1 }}>
              <small>Skill Point {String(index + 1).padStart(2, '0')}</small>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
