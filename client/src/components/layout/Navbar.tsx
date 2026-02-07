import { Link, useLocation } from "wouter";
import { BrainCircuit, LayoutDashboard, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: BrainCircuit },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    // { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
            <BrainCircuit className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">Interview.ai</span>
        </Link>

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                location === item.href ? "text-primary" : "text-muted-foreground"
              )}>
                <item.icon className="w-4 h-4" />
                {item.label}
            </Link>
          ))}
          <Link href="/setup" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/20 cursor-pointer">
            Start Interview
          </Link>
        </div>
      </div>
    </nav>
  );
}
