import { motion } from 'framer-motion';
import { strengths } from '../data/portfolio.js';
import { popItem, sectionReveal, springy, staggerParent, usePrefersReducedMotion } from '../utils/animation.js';

const branches = ['AI', 'Product', 'Frontend', 'Prompt', 'UX', 'Figma', 'React', 'Python'];

export function Strengths() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="page-section strengths-section reveal-section" id="strengths">
      <motion.div
        className="section-inner section-heading"
        variants={reducedMotion ? undefined : sectionReveal}
        initial={reducedMotion ? undefined : 'hidden'}
        whileInView={reducedMotion ? undefined : 'show'}
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className="kicker">Skill Tree</p>
        <h2>不是堆图标，而是一棵 AI 创作者的复合技能树。</h2>
        <p>
          技能点围绕 AI 实践、产品判断、视觉表达和工程落地展开，适合 AI 开发 / AI 产品经理 / AI 设计方向展示。
        </p>
      </motion.div>

      <motion.div
        className="section-inner skill-tree"
        variants={reducedMotion ? undefined : sectionReveal}
        initial={reducedMotion ? undefined : 'hidden'}
        whileInView={reducedMotion ? undefined : 'show'}
        viewport={{ once: true, amount: 0.22 }}
      >
        <motion.div
          className="tree-core"
          whileHover={reducedMotion ? undefined : { y: -6, scale: 1.04 }}
          transition={springy}
        >
          <span>Core</span>
          <strong>AI Creator</strong>
        </motion.div>

        <motion.div
          className="branch-row"
          aria-label="Skill branches"
          variants={reducedMotion ? undefined : staggerParent}
          initial={reducedMotion ? undefined : 'hidden'}
          whileInView={reducedMotion ? undefined : 'show'}
          viewport={{ once: true }}
        >
          {branches.map((branch, index) => (
            <motion.span
              style={{ '--delay': `${index * 90}ms` }}
              key={branch}
              variants={reducedMotion ? undefined : popItem}
              whileHover={reducedMotion ? undefined : { y: -6, scale: 1.08 }}
              whileTap={reducedMotion ? undefined : { scale: 0.94 }}
              transition={springy}
            >
              {branch}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="strengths-grid"
          variants={reducedMotion ? undefined : staggerParent}
          initial={reducedMotion ? undefined : 'hidden'}
          whileInView={reducedMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.16 }}
        >
          {strengths.map((item, index) => (
            <motion.article
              className="strength-card"
              key={item.title}
              variants={reducedMotion ? undefined : popItem}
              whileHover={reducedMotion ? undefined : { y: -8, scale: 1.025 }}
              transition={springy}
            >
              <small>Skill Point {String(index + 1).padStart(2, '0')}</small>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
