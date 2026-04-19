// Primero definimos los tipos para asegurar que no cometamos errores (TypeScript Magic ✨)
export type Translation = {
  es: string;
  en: string;
  ja: string;
  fr: string;
};

export type Technology = {
  name: string;
  bgColor: string;
  textColor: string;
};

export type Project = {
  name: string;
  image: string;
  github: string;
  preview?: string; // El signo de interrogación significa que es opcional (no todos tienen preview)
  technologies: Technology[];
  description: Translation;
};

// Aquí está tu base de datos centralizada
export const projectsData: Project[] = [
  {
    name: "Bloge",
    image: "/bloge.webp",
    github: "https://github.com/alexhl0723/blogee",
    preview: "https://blogereal.vercel.app/",
    technologies: [
      { name: "Astro", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" },
      { name: "Tailwind CSS", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" },
      { name: "TypeScript", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" },
      { name: "JavaScript", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" },
      { name: "React", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" }
    ],
    description: {
      es: "Mi blog aun en desarrollo con el diseño y las funcionalidades ya desarrolladas.",
      en: "My blog still in development with the design and the functionalities already developed.",
      ja: "私のブログはまだ開発中ですが、デザインと機能部分はすでに開発されています。",
      fr: "Mon blog encore en développement avec le design et les fonctionnalités déjà développées."
    }
  },
  {
    name: "Nautica Plus",
    image: "/reservaRes.webp",
    github: "https://github.com/alexhl0723/ReservaRestaurante",
    technologies: [
      { name: "Java", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" },
      { name: "Javascript", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" },
      { name: "Tailwind CSS", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" },
      { name: "MySQL", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" }
    ],
    description: {
      es: "Aplicación web que permite a los usuarios registrar una reserva y gestionar sus reservas.",
      en: "Web application that allows users to register and manage their reservations.",
      ja: "ユーザーが予約を登録し、予約を管理できるWebアプリケーション。",
      fr: "Application web permettant aux utilisateurs d’enregistrer une réservation et de gérer leurs réservations."
    }
  },
  {
    name: "Bot Discord",
    image: "/BotMewin.webp",
    github: "https://github.com/alexhl0723/botDiscord",
    technologies: [
      { name: "JavaScript", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" },
      { name: "Node.js", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" }
    ],
    description: {
      es: "Bot de Discord creado para hacer más divertida la experiencia con amigos en Discord.",
      en: "Discord bot created to make the experience with friends on Discord more fun.",
      ja: "Discordでの友達との体験をより楽しくするために作成されたDiscordボット。",
      fr: "Bot Discord créé pour rendre l’expérience avec des amis sur Discord plus amusante."
    }
  },
  {
    name: "Bot Whatsapp",
    image: "/botWhap.webp",
    github: "https://github.com/alexhl0723/WhatAppbot",
    technologies: [
      { name: "Node.js", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" },
      { name: "Javascript", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" }
    ],
    description: {
      es: "Bot de whatsapp creado con comandos personalizados y funcionalidades para hacer más divertida la experiencia con amigos en whatsapp.",
      en: "Whatsapp bot created with custom commands and features to make the experience with friends on Whatsapp more fun.",
      ja: "カスタムコマンドや機能を備えたWhatsAppボットで、友達とのやり取りをより楽しくします。",
      fr: "Bot Whatsapp avec des commandes personnalisées et des fonctionnalités amusantes pour vos amis."
    }
  },
  {
    name: "Translate",
    image: "/translate.png",
    github: "/",
    preview: "https://translate.alexhl.me/",
    technologies: [
      { name: "Node.js", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" },
      { name: "Javascript", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" },
      { name: "Express", bgColor: "rgba(191, 219, 254, 0.1)", textColor: "#BFDBFE" }
    ],
    description: {
      es: "App para traducir audios mp3 de diferentes idiomas al español.",
      en: "App to translate mp3 audio from different languages into Spanish.",
      ja: "さまざまな言語のmp3音声をスペイン語に翻訳するアプリ。",
      fr: "Application pour traduire des audios mp3 de différentes langues vers l'espagnol."
    }
  }
];