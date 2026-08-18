export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  image: string;
  url:string;
};

export const projects: Project[] = [
  {
    slug: "fleeby",
    name: "Fleeby",
    category: "e-commerce",
    description: "E-commerce platform for selling products online.",
    tags: ["React.js", "Django", "PostgreSQL", "Docker", "RestAPI","AWS"],
    gradient: "from-violet/70 via-blue/60 to-cyan/50",
    image:"/fleeby.webp",
    url:"https://fleeby.in"
  },
  {
    slug: "mistyhills",
    name: "Misty Hills Spices",
    category: "Static Website",
    description: "Showcasing the products and brand of Misty Hills Spices.",
    tags: ["React.js", "Vercel","Tailwind Css"],
    gradient: "from-blue/70 via-cyan/55 to-violet/45",
    image:"/spices.webp",
    url:"https://mistyhillsspices.com/"

  },
  {
    slug: "quickbill",
    name: "Quick Bill",
    category: "Billing Software",
    description: "A billing software for small businesses.",
    tags: ["React", "TypeScript","Tailwind Css"],
    gradient: "from-cyan/60 via-blue/60 to-violet/60",
    image:"/quick_bill.webp",
    url:"https://quick-bill-five.vercel.app/"
    
  },
  {
    slug: "evoevent",
    name: "Evo Event Management",
    category: "Static Website",
    description: "Showcasing the events and brand of Evo Event Management.",
    tags: ["React", "Tailwind Css", "Vercel"],
    gradient: "from-blue/60 via-violet/55 to-cyan/60",
    image:"/evo.webp",
    url:"https://evo-eventmanagement.vercel.app/"
  },
  {
    slug: "twinkleoffset",
    name: "Twinkle Offset Press",
    category: "Static Website",
    description: "Showcasing the brand of Twinkle Offset Press.",
    tags: ["React", "Tailwind Css", "Vercel"],
    gradient: "from-blue/60 via-violet/55 to-cyan/60",
    image:"/twinkle.webp",
    url:"https://twinkleoffset.shop/"
  },
];
