import {
  BadgeCheck,
  BookOpenText,
  BrainCircuit,
  Camera,
  Code2,
  FileText,
  GitBranch,
  HeartHandshake,
  Layers3,
  Mail,
  MessageCircle,
  MonitorCog,
  PenLine,
  Sparkles,
  WandSparkles,
} from 'lucide-react';

export const profile = {
  name: '严玉雯',
  role: 'AI Developer / AI Product Manager / AI Designer',
  location: 'Beijing, China',
  email: '2540231758@qq.com',
  wechat: '请替换为微信号',
  xiaohongshu: '请替换为小红书主页',
  portfolio: "Yuwen's Journey",
  csdn: {
    label: 'CSDN: Sunfor_sun',
    url: 'https://blog.csdn.net/Sunfor_sun',
    note: '341 followers',
  },
  gitee: {
    label: 'Gitee: sf_11_0',
    url: 'https://gitee.com/sf_11_0',
  },
};

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Journey', href: '#about' },
  { label: 'Missions', href: '#works' },
  { label: 'Skill Tree', href: '#strengths' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: 'AI Creator Dashboard / Cozy Pixel World',
  title: "Yuwen's Journey",
  subtitle: '用 AI 与设计创造温暖的体验，记录成长，也创造新的可能。',
  intro:
    '这里像一个可进入的个人小世界：有 AI 项目、产品思考、代码实践，也有摄影、拼贴、手写字、舞蹈和生活灵感。',
  image: '/assets/hero-yuwen-journey.png',
};

export const about = {
  text:
    '我是一名正在成长中的 AI 设计师与视觉设计创作者，关注品牌视觉、AI 生成内容、摄影影像、情绪化表达和产品体验。我喜欢把理性的结构设计与感性的视觉语言结合起来，让作品既清晰有效，也保留个人温度。',
  resumeHighlights: [
    '北京科技大学天津学院计算机科学与技术本科，英语六级已通过。',
    '熟悉 Prompt 设计、HTTP/JSON、API 调用、Python、C/C++、C# 与前端基础。',
    '参与 Lookee 二代 AI 口练机交付验证、问题池维护、家长学习反馈需求拆解。',
    '持续更新 CSDN 原创技术博客，具备文档沉淀、跨团队沟通与快速学习能力。',
  ],
  contacts: [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: MessageCircle, label: 'WeChat', value: profile.wechat },
    { icon: BookOpenText, label: 'CSDN', value: profile.csdn.label, href: profile.csdn.url },
    { icon: GitBranch, label: 'Gitee', value: profile.gitee.label, href: profile.gitee.url },
  ],
};

export const stats = [
  { value: '20+', label: 'Visual Experiments' },
  { value: '10+', label: 'AI Design Projects' },
  { value: '3+', label: 'Product Design Cases' },
  { value: '1000+', label: 'Creative Assets' },
];

export const works = [
  {
    title: 'AI Digital Human Experiment',
    type: 'AI Design / Digital Human',
    description:
      '使用多模态工具完成照片关键词提取、AI 形象生成、音色创建与数字人视频制作。',
    tags: ['Multimodal', 'Digital Human', 'AIGC'],
    accent: 'lavender',
    icon: WandSparkles,
  },
  {
    title: 'Lookee Parent Report Design',
    type: 'Product Design / Data Visualization',
    description:
      '为儿童英语口语练习产品设计家长学习反馈页，将学习数据转化为易理解、有温度的成长反馈。',
    tags: ['AI Hardware', 'User Scenario', 'Feedback System'],
    accent: 'mint',
    icon: MonitorCog,
  },
  {
    title: 'Visual Poster System',
    type: 'Brand Design / Poster',
    description:
      '围绕用户数据生成分享海报系统，探索 AI 与品牌传播素材的自动化结合。',
    tags: ['Brand', 'Automation', 'Poster'],
    accent: 'cream',
    icon: Layers3,
  },
  {
    title: 'Personal Photography Archive',
    type: 'Photography / Visual Diary',
    description:
      '记录日常、旅行、情绪与光影，把照片作为个人表达的一部分。',
    tags: ['Photo', 'Diary', 'Light'],
    accent: 'blue',
    icon: Camera,
  },
  {
    title: 'Collage & Handwriting Notes',
    type: 'Visual Exploration',
    description:
      '结合拼贴、手写字与文字表达，形成具有个人气质的视觉语言。',
    tags: ['Collage', 'Handwriting', 'Mood'],
    accent: 'pink',
    icon: PenLine,
  },
  {
    title: 'Kpop Motion Moodboard',
    type: 'Motion Inspiration / Lifestyle',
    description:
      '从舞蹈、音乐和舞台视觉中提取节奏感、色彩和动态灵感。',
    tags: ['Motion', 'Rhythm', 'Stage Visual'],
    accent: 'silver',
    icon: Sparkles,
  },
];

export const strengths = [
  {
    title: 'AI Design Thinking',
    description:
      '能够使用 AI 工具辅助完成图像生成、数字人、视觉探索和创意验证。',
    icon: BrainCircuit,
  },
  {
    title: 'Visual Storytelling',
    description:
      '擅长用图片、文字、排版和情绪氛围表达一个完整的故事。',
    icon: Camera,
  },
  {
    title: 'Product Sense',
    description:
      '能够从用户体验和产品目标出发，设计更清晰、更有转化力的页面。',
    icon: FileText,
  },
  {
    title: 'Brand Sensibility',
    description:
      '关注品牌气质、视觉统一性和内容表达，不只是做漂亮的图。',
    icon: BadgeCheck,
  },
  {
    title: 'Learning & Execution',
    description:
      '能快速学习新工具，并把想法落地成可展示的作品。',
    icon: HeartHandshake,
  },
  {
    title: 'Engineering Literacy',
    description:
      '理解 API、日志复现、测试验收、Git 协作与基础工程流程。',
    icon: Code2,
  },
];
