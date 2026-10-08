import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, X, Instagram, Mail, Moon, Sun, User, LogOut, ChevronDown, Phone } from "lucide-react";
import logoUrl from "@/assets/vybe-driven-logo.png";
import homeIcon from "@/assets/nav/home.png.asset.json";
import hackathonsIcon from "@/assets/nav/hackathons.png.asset.json";
import eventsIcon from "@/assets/nav/events.png.asset.json";
import discoverIcon from "@/assets/nav/discover.png.asset.json";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

function Logo({ className = "h-14" }: { className?: string }) {
  return <Link to="/" className="flex items-center justify-center" aria-label="Vybe Driven home"><span className={`${className} block flex items-center justify-center`}><img src={logoUrl} alt="Vybe Driven" className="h-full w-auto object-contain scale-[2.2] origin-center invert hue-rotate-180 dark:invert-0 dark:hue-rotate-0 transition-all" /></span></Link>;
}

const links = [
  { label: "Home", to: "/" as const, image: homeIcon.url },
  { label: "Hackathons", to: "/hackathons" as const, image: hackathonsIcon.url },
  { label: "Events", to: "/events" as const, image: eventsIcon.url },
  { label: "Discover", to: "/discover" as const, image: discoverIcon.url },
];

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("hd-theme", next ? "dark" : "light"); } catch { /* storage may be unavailable */ }
  };
  const label = dark ? "Switch to light mode" : "Switch to dark mode";
  return <Button onClick={toggle} aria-label={label} title={label} variant="outline" size="icon" className="rounded-full bg-surface hover:border-neon hover:text-neon">{dark ? <Sun /> : <Moon />}</Button>;
}

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const close = (event: MouseEvent) => { if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const signOut = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    await navigate({ to: "/", replace: true });
  };
  return (
    <div ref={ref} className="relative">
      <Button onClick={() => setOpen((value) => !value)} aria-label="Open profile menu" variant="outline" className="h-10 rounded-full bg-surface px-3">
        <User className="size-4" /><ChevronDown className="size-3" />
      </Button>
      {open && <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-popover p-2 shadow-glow-soft">
        <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-popover-foreground hover:bg-surface hover:text-neon"><User className="size-4" />Complete profile</Link>
        <Button onClick={signOut} variant="ghost" className="h-auto w-full justify-start rounded-lg px-3 py-2 font-normal text-popover-foreground hover:bg-surface hover:text-neon"><LogOut className="size-4" />Sign out</Button>
      </div>}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();
  return (
    <header className="sticky top-4 z-50 px-4">
      <nav className="relative mx-auto flex h-18 max-w-280 items-center justify-between rounded-[24px] border border-border px-4 backdrop-blur-xl transition-colors" style={{ background: "var(--nav-bg)", boxShadow: "var(--nav-shadow)" }}>
        <ul className="hidden items-center gap-2 lg:flex">
          {links.map((item) => {
            const active = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
            return <li key={item.label} className="group relative"><Link to={item.to} aria-label={item.label} title={item.label} className={`nav-icon grid size-11 place-items-center rounded-full border-2 transition ${active ? "is-active border-lime shadow-glow" : "border-transparent hover:border-border hover:bg-surface"}`}><img src={item.image} alt="" className="nav-art size-6 object-contain" /></Link><span className="pointer-events-none absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-within:opacity-100">{item.label}</span></li>;
          })}
        </ul>
        <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center"><Logo className="h-16" /></div>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/contact" className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-neon">Contact Us</Link>
          {!loading && (user ? <ProfileMenu /> : <Button asChild className="rounded-full bg-gradient-brand text-primary-foreground hover:brightness-105"><Link to="/auth" search={{ mode: "signin", next: "/" }}>Sign In</Link></Button>)}
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 lg:hidden"><ThemeToggle /><Button variant="ghost" size="icon" className="rounded-full" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</Button></div>
      </nav>
      {open && <div className="mx-auto mt-2 max-w-280 rounded-2xl border border-border p-3 backdrop-blur-xl lg:hidden" style={{ background: "var(--nav-bg)", boxShadow: "var(--nav-shadow)" }}>
        {links.map((item) => <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface"><img src={item.image} alt="" className="nav-art size-6 object-contain" />{item.label}</Link>)}
        <Link to="/contact" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface"><Phone className="size-5 text-neon" />Contact Us</Link>
        <div className="mt-3 border-t border-border pt-3">{!loading && (user ? <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold"><User className="size-4" />Profile</Link> : <Button asChild className="w-full rounded-full bg-gradient-brand text-primary-foreground"><Link to="/auth" search={{ mode: "signin", next: "/" }}>Sign In</Link></Button>)}</div>
      </div>}
    </header>
  );
}

export function Footer() {
  return <footer className="mt-10 border-t border-border bg-background"><div className="mx-auto grid max-w-300 gap-8 px-6 py-10 md:grid-cols-[1.5fr_1fr_1fr]"><div><Logo className="h-16 ml-4" /><p className="mt-3 max-w-xs text-sm text-muted-foreground">Where ambitious builders meet their next challenge.</p><div className="mt-4 flex gap-2"><a href="https://www.instagram.com/vybedriven" target="_blank" rel="noreferrer" aria-label="Vybe Driven on Instagram" className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-neon/50 hover:text-neon"><Instagram className="size-4" /></a><a href="mailto:vybedriven@gmail.com" aria-label="Email Vybe Driven" className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-neon/50 hover:text-neon"><Mail className="size-4" /></a></div></div><div><h4 className="text-sm font-semibold">Explore</h4><ul className="mt-3 space-y-2"><li><Link to="/hackathons" className="text-sm text-muted-foreground hover:text-foreground">Hackathons</Link></li><li><Link to="/events" className="text-sm text-muted-foreground hover:text-foreground">Events</Link></li><li><Link to="/discover" className="text-sm text-muted-foreground hover:text-foreground">Discover</Link></li></ul></div><div><h4 className="text-sm font-semibold">Contact</h4><ul className="mt-3 space-y-2"><li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact Us</Link></li><li><a href="mailto:vybedriven@gmail.com" className="break-all text-sm text-muted-foreground hover:text-foreground">vybedriven@gmail.com</a></li><li><a href="https://www.instagram.com/vybedriven" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">@vybedriven</a></li></ul></div></div><div className="relative overflow-hidden bg-gradient-brand text-primary-foreground"><div className="relative mx-auto max-w-350 px-4 pb-5 pt-7"><p className="select-none whitespace-nowrap text-center text-[12.5vw] tracking-tighter font-black leading-[0.85] xl:text-[11rem]">VYBE DRIVEN</p><p className="mt-4 text-center text-xs font-medium">© 2026 Vybe Driven. All rights reserved.</p></div></div></footer>;
}
