import { Home, LayoutGrid, Layers, User, Mail } from "lucide-react";

export const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: LayoutGrid },
  { to: "/technologies", label: "Technologies", icon: Layers },
  { to: "/about", label: "About", icon: User },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

export const social = {
  email: "hello@fifthbyte.dev",
  linkedin: "https://linkedin.com/company/fifthbyte",
  github: "https://github.com/fifthbyte",
};
