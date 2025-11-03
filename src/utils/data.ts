import { date } from "astro:schema";

export const timelineData = {
  es: [
    { 
      id: 1,
      type: 'Trabajo',
      date: '2025 - Presente',
      startDate: '2025-08-01',
      title: 'Programador .NET',
      company: 'MYPER',
      location: 'Lima, Perú',
      description: 'Backend con .NET y herramientas de vanguardia. Colaboración en proyectos ágiles y mejora continua de la experiencia de usuario.',
      skills: ['.NET', 'C#','SQLServer', 'Git', 'Github'],
      current: true
    },
    {
      id: 2,
      type: 'Estudio',
      date: '2024 - 2026',
      title: 'Computación e Informática',
      company: '',
      location: 'Lima, Perú',
      description: 'Aprendizaje intensivo de tecnologías web modernas, construcción de proyectos personales y contribución a proyectos de código abierto.',
      skills: ['JavaScript', 'Astro', 'Node.js', 'MongoDB'],
      current: false
    },
    {
      id: 3,
      type: 'Certificado',
      date: '2024',
      title: 'Certificación en Desarrollo Web',
      company: 'Plataforma Online',
      location: 'En línea',
      description: 'Completé cursos especializados en desarrollo frontend y backend, obteniendo certificaciones en las principales tecnologías web.',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React'],
      current: false
    }
  ],
  en: [
    {
      id: 1,
      type: 'Work',
      date: '2025 - Present',
      startDate: '2025-08-01',
      title: '.NET Developer',
      company: 'MYPER',
      location: 'Lima, Peru',
      description: 'Development of modern web applications using .NET, TypeScript and cutting-edge tools. Collaboration in agile projects and continuous improvement of user experience.',
      skills: ['.NET', 'TypeScript', 'Tailwind CSS', 'Git'],
      current: true
    },
    {
      id: 2,
      type: 'Study',
      date: '2023 - 2024',
      title: 'Computer Science',
      company: 'National University',
      location: 'Lima, Peru',
      description: 'Intensive learning of modern web technologies, building personal projects and contributing to open source projects.',
      skills: ['JavaScript', 'Astro', 'Node.js', 'MongoDB'],
      current: false
    },
    {
      id: 3,
      type: 'Certificate',
      date: '2024',
      title: 'Web Development Certification',
      company: 'Online Platform',
      location: 'Online',
      description: 'Completed specialized courses in frontend and backend development, obtaining certifications in leading web technologies.',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React'],
      current: false
    }
  ],
  fr: [
    { 
      id: 1,
      type: 'Travail',
      date: '2025 - Présent',
      title: 'Développeur .NET',
      company: 'MYPER',
      location: 'Lima, Pérou',
      description: 'Développement d\'applications web modernes avec .NET, TypeScript et des outils de pointe. Collaboration sur des projets agiles et amélioration continue de l\'expérience utilisateur.',
      skills: ['.NET', 'TypeScript', 'Tailwind CSS', 'Git'],
      current: true
    },
    {
      id: 2,
      type: 'Étude',
      date: '2023 - 2024',
      title: 'Informatique',
      company: 'Université Nationale',
      location: 'Lima, Pérou',
      description: 'Apprentissage intensif des technologies web modernes, construction de projets personnels et contribution à des projets open source.',
      skills: ['JavaScript', 'Astro', 'Node.js', 'MongoDB'],
      current: false
    },
    {
      id: 3,
      type: 'Certificat',
      date: '2024',
      title: 'Certification en Développement Web',
      company: 'Plateforme en Ligne',
      location: 'En Ligne',
      description: 'J\'ai suivi des cours spécialisés en développement frontend et backend, obtenant des certifications dans les principales technologies web.',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React'],
      current: false
    }
  ],
  ja: [
    { 
      id: 1,
      type: '仕事',
      date: '2025年 - 現在',
      title: '.NET開発者',
      company: 'MYPER',
      location: 'リマ、ペルー',
      description: '.NET、TypeScript、最新のツールを使用したモダンなWebアプリケーションの開発。アジャイルプロジェクトへの協力とユーザーエクスペリエンスの継続的な改善。',
      skills: ['.NET', 'TypeScript', 'Tailwind CSS', 'Git'],
      current: true
    },
    {
      id: 2,
      type: '学歴',
      date: '2023年 - 2024年',
      title: 'コンピュータサイエンス',
      company: '国立大学',
      location: 'リマ、ペルー',
      description: '現代のWeb技術の集中的な学習、個人プロジェクトの構築、オープンソースプロジェクトへの貢献。',
      skills: ['JavaScript', 'Astro', 'Node.js', 'MongoDB'],
      current: false
    },
    {
      id: 3,
      type: '認定',
      date: '2024年',
      title: 'Web開発認定',
      company: 'オンラインプラットフォーム',
      location: 'オンライン',
      description: 'フロントエンドとバックエンド開発の専門コースを修了し、主要なWeb技術の認定を取得しました。',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React'],
      current: false
    } 
  ]
};