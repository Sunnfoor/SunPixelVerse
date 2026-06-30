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
  name: 'Yuwen',
  chineseName: '严玉雯',
  role: 'AI Developer / AI Product Manager / AI Designer',
  location: 'Beijing, China',
  email: '2540231758@qq.com',
  wechat: 'yuwen_design',
  xiaohongshu: '@sunfor',
  portfolio: "Yuwen's Portfolio",
  avatar: '/assets/avatar/avatar-polaroid.png',
  catLogo: '/assets/avatar/cat-logo.png',
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
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Strengths', href: '#strengths' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: 'Pastel Pixel Art / AI Creator Studio',
  title: "Hello, I'm Yuwen ♥",
  subtitle: '用 AI 与设计创造温暖的体验',
  intro: '记录成长，也创造新的可能',
  image: '/assets/hero/hero-pixel-studio.png',
};

export const about = {
  text:
    '你好呀！我是雨雯，一名热爱 AI 与设计的创造者。我关注 AI 产品、用户体验、数据可视化和视觉表达，喜欢把想法落地成真实可用的作品。平时喜欢摄影、插画、拼贴、手写字、Kpop 舞蹈，也会用影像和文字记录生活。',
  resumeHighlights: [
    '计算机科学与技术本科，关注 AI 开发、产品设计与创意技术。',
    '熟悉 Prompt、HTTP/JSON、API 调用、Python、C/C++、C# 与前端基础。',
    '参与 Lookee 二代 AI 口练机验证、问题池维护与家长学习反馈需求拆解。',
    '持续更新 CSDN 原创技术博客，具备文档沉淀与快速学习能力。',
  ],
  contacts: [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: MessageCircle, label: 'WeChat', value: profile.wechat },
    { icon: BookOpenText, label: 'CSDN', value: profile.csdn.label, href: profile.csdn.url },
    { icon: GitBranch, label: 'Gitee', value: profile.gitee.label, href: profile.gitee.url },
  ],
};

export const stats = [
  { value: '20+', label: 'AI Projects', note: '数字人、AI 海报、AI 产品验证与 Prompt 实验。' },
  { value: '10+', label: 'Product Cases', note: '需求拆解、用户路径、反馈页与产品测试场景。' },
  { value: '50+', label: 'Design Works', note: '海报、视觉实验、拼贴、影像与界面探索。' },
  { value: '1000+', label: 'Creative Assets', note: '照片、素材、笔记、灵感板和创作记录。' },
];

export const filters = ['All', 'AI', 'Product', 'Visual', 'Life'];

export const works = [
  {
    title: 'AI Digital Human Experiment',
    type: 'AI Design / Digital Human',
    category: 'AI',
    description: '多模态工具生成数字人，完成照片关键词提取、AI 形象生成与视频制作。',
    tags: ['AI Design', 'Digital Human'],
    accent: 'lavender',
    cover: '/assets/projects/ai-digital-human.png',
    status: 'Completed',
    difficulty: '★★★★☆',
    role: 'AI Workflow / Visual Experiment',
    tools: ['Prompt', 'AIGC', 'Voice', 'Video'],
    outcome: '完成从照片理解、角色生成、音色设计到数字人视频的完整链路。',
    details:
      '这个项目用于验证多模态工具如何快速产出可展示的数字人内容。我负责关键词提取、生成策略、素材组织和视频流程串联。',
    icon: WandSparkles,
  },
  {
    title: 'Lookee Parent Report Design',
    type: 'Product Design / Data Visualization',
    category: 'Product',
    description: '为儿童英语口语练习产品设计家长学习反馈页，将数据转化为温暖的成长反馈。',
    tags: ['Product Design', 'Data Viz'],
    accent: 'blue',
    cover: '/assets/projects/lookee-parent-report.png',
    status: 'Completed',
    difficulty: '★★★★☆',
    role: 'AI PM / Product Design',
    tools: ['Feishu', 'User Scenario', 'Feedback Page', 'Testing'],
    outcome: '把“盯进度、看坚持、查漏点、找对策”转化为家长可理解的反馈结构。',
    details:
      '基于 Lookee AI 口练机的家长使用场景，梳理学习记录、能力情况、备考反馈等页面目标，并参与硬件测试与问题池维护。',
    icon: MonitorCog,
  },
  {
    title: 'Visual Poster System',
    type: 'Brand Design / Poster',
    category: 'AI',
    description: '基于用户数据生成分享海报，探索 AI 与品牌传播素材的自动化结合。',
    tags: ['Brand Design', 'AI Automation'],
    accent: 'pink',
    cover: '/assets/projects/visual-poster-system.png',
    status: 'Prototype',
    difficulty: '★★★☆☆',
    role: 'Creative Technology / Brand',
    tools: ['Template', 'Automation', 'Visual System'],
    outcome: '形成可复用的海报生成思路，适配分享传播和品牌视觉统一。',
    details:
      '用模块化方式组织标题、数据、二维码、视觉装饰和用户信息，让传播素材更容易批量生产与维护。',
    icon: Layers3,
  },
  {
    title: 'Personal Photography Archive',
    type: 'Photography / Visual Diary',
    category: 'Life',
    description: '记录生活、旅行、情绪与光影，把照片作为个人表达的一部分。',
    tags: ['Photography', 'Visual Diary'],
    accent: 'mint',
    cover: '/assets/projects/photography-archive.png',
    status: 'Ongoing',
    difficulty: '★★★☆☆',
    role: 'Photography / Storytelling',
    tools: ['Camera', 'Light', 'Diary', 'Archive'],
    outcome: '沉淀个人影像语言，让作品集不只展示技能，也展示审美记忆点。',
    details:
      '把日常观察、旅行片段和情绪记录整理成视觉档案，为产品设计和影像叙事提供灵感来源。',
    icon: Camera,
  },
  {
    title: 'Collage & Handwriting Notes',
    type: 'Visual Exploration',
    category: 'Visual',
    description: '结合拼贴、手写字与文字表达，形成具有个人气质的视觉语言。',
    tags: ['Collage', 'Handwriting'],
    accent: 'cream',
    cover: '/assets/projects/collage-notes.png',
    status: 'Ongoing',
    difficulty: '★★★☆☆',
    role: 'Visual Exploration',
    tools: ['Collage', 'Handwriting', 'Notebook'],
    outcome: '建立更个人化的手账式视觉语言，适合品牌情绪和内容表达。',
    details:
      '通过纸张、照片、便签、手写字和色块组合，探索更有温度的视觉表达方式。',
    icon: PenLine,
  },
  {
    title: 'Kpop Motion Moodboard',
    type: 'Motion Inspiration / Lifestyle',
    category: 'Life',
    description: '从舞蹈、音乐和舞台视觉中提取节奏感、色彩和动态灵感。',
    tags: ['Motion', 'Inspiration'],
    accent: 'silver',
    cover: '/assets/projects/kpop-motion.png',
    status: 'Ongoing',
    difficulty: '★★★☆☆',
    role: 'Motion Inspiration',
    tools: ['Dance', 'Stage Visual', 'Moodboard'],
    outcome: '把舞台节奏、灯光和色彩转化为界面动效与视觉氛围参考。',
    details:
      '从舞蹈练习、舞台视觉和音乐节奏中提取灵感，帮助作品集形成更有生命力的动态表达。',
    icon: Sparkles,
  },
];

export const galleryItems = [
  {
    title: 'Photo Diary',
    image: '/assets/projects/photography-archive.png',
    caption: '日常、旅行与光影记录，后续可以替换为你的真实摄影作品。',
  },
  {
    title: 'Collage Desk',
    image: '/assets/projects/collage-notes.png',
    caption: '拼贴、手写字、便签、票根和视觉实验的收纳处。',
  },
  {
    title: 'Motion Mood',
    image: '/assets/projects/kpop-motion.png',
    caption: 'Kpop 舞蹈、舞台色彩和动态节奏带来的灵感板。',
  },
  {
    title: 'AI Studio',
    image: '/assets/hero/hero-pixel-studio.png',
    caption: 'AI 创作者的像素工作室，也是整个网站的视觉母题。',
  },
];

export const strengths = [
  {
    title: 'AI Design Thinking',
    description: '能够使用 AI 工具辅助完成图像生成、数字人、视觉探索和创意验证。',
    icon: BrainCircuit,
  },
  {
    title: 'Visual Storytelling',
    description: '擅长用图片、文字、排版和情绪氛围表达一个完整的故事。',
    icon: Camera,
  },
  {
    title: 'Product Sense',
    description: '能够从用户体验和产品目标出发，设计更清晰、更有转化力的页面。',
    icon: FileText,
  },
  {
    title: 'Brand Sensibility',
    description: '关注品牌气质、视觉统一性和内容表达，不只是做漂亮的图。',
    icon: BadgeCheck,
  },
  {
    title: 'Learning & Execution',
    description: '能快速学习新工具，并把想法落地成可展示的作品。',
    icon: HeartHandshake,
  },
  {
    title: 'Engineering Literacy',
    description: '理解 API、日志复现、测试验收、Git 协作与基础工程流程。',
    icon: Code2,
  },
];
