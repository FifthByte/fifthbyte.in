import type { IconType } from "react-icons/lib";
import {
  LuShoppingCart,
  LuBriefcaseBusiness,
  LuGlobe,
  LuLayoutDashboard,
} from "react-icons/lu";

interface Category {
    slug: string;
    name: string;
    category: string;
    description: string;
    tags: string[];
    gradient: string;
    icon?: IconType;
}


export const categories: Category[] = [
    {
        slug: "ecommerce-platform",
        name: "E-commerce Platforms",
        category: "Commerce",
        description:
            "Scalable online stores with secure payments, inventory management, order tracking, and admin dashboards.",
        tags: [
            "Next.js",
            "React",
            "Django",
            "PostgreSQL",
            "AWS",
            "Stripe",
        ],
        gradient: "from-violet/70 via-blue/60 to-cyan/50",
        icon: LuShoppingCart,
    },
    {
        slug: "job-portals",
        name: "Job Portals",
        category: "Recruitment",
        description:
            "Modern recruitment platforms with candidate management, employer dashboards, application tracking, and advanced search.",
        tags: [
            "React",
            "Next.js",
            "Python",
            "PostgreSQL",
            "REST API",
        ],
        gradient: "from-blue/70 via-cyan/55 to-violet/45",
        icon: LuBriefcaseBusiness,

    },
    {
        slug: "business-websites",
        name: "Business Websites",
        category: "Corporate",
        description:
            "Fast, responsive websites designed to establish a strong online presence and generate more business.",
        tags: [
            "Next.js",
            "React",
            "Tailwind CSS",
            "Framer Motion",
            "Vercel",
        ],
        gradient: "from-cyan/60 via-blue/60 to-violet/60",
        icon: LuGlobe,

    },
    {
        slug: "crm-dashboard",
        name: "CRM & Dashboards",
        category: "Business Software",
        description:
            "Custom CRM systems, analytics dashboards, and workflow automation tools tailored to business operations.",
        tags: [
            "React",
            "TypeScript",
            "Python",
            "Django",
            "PostgreSQL",
        ],
        gradient: "from-blue/60 via-violet/55 to-cyan/60",
        icon: LuLayoutDashboard,

    },
];