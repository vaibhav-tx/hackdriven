import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight, Users, Calendar, Trophy, Radio, MapPin, Search, UsersRound, Rocket, LineChart,
  Swords, Award, Zap, Globe, Activity, Code2, Sparkles,
} from "lucide-react";
import { Navbar, Footer } from "@/components/SiteChrome";
import { Reveal, Eyebrow, PrimaryBtn, GhostBtn } from "@/components/ui-hd";

import communityAudience from "@/assets/community-real/community-audience.jpg.asset.json";
import communityTalk from "@/assets/community-real/community-talk.jpg.asset.json";
import communityBuilders from "@/assets/community-real/community-builders.jpg.asset.json";
import communityPresentation from "@/assets/community-real/community-presentation.jpg.asset.json";
import communityGroup from "@/assets/community-real/community-group.jpg.asset.json";
import hackathonHall from "@/assets/community-real/hackathon-hall.jpg";
import inceptrixGroup from "@/assets/community-real/inceptrix-group.png";
import computerLab from "@/assets/community-real/computer-lab.png";
import organizerGroup from "@/assets/community-real/organizer-group.png";
import auditoriumAudience from "@/assets/community-real/auditorium-audience.png";
import { opportunities, type Opportunity } from "@/data/opportunities";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vybe Driven — Discover Hackathons & Tech Events" },
      { name: "description", content: "Discover hackathons, competitions and technology events built for ambitious developers, creators and innovators." },
      { property: "og:title", content: "Vybe Driven — Build. Hack. Drive the Future." },
      { property: "og:description", content: "Find your next hackathon, team up and build what's next on Vybe Driven." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type HomeFilter = "All" | "Hackathons" | "Competitions" | "Tech Events";
const filters: HomeFilter[] = ["All", "Hackathons", "Competitions", "Tech Events"];

function matchesHomeFilter(item: Opportunity, filter: HomeFilter) {
  if (filter === "All") return true;
  if (filter === "Hackathons") return item.type === "Hackathon";
  if (filter === "Competitions") return item.type === "Competition";
  return item.type === "Meetup" || item.type === "Conference" || item.type === "Networking";
}

const heroSlides = [
  { src: communityGroup.url, alt: "Vybe Driven community members gathered after an event", position: "center 42%" },
  { src: inceptrixGroup, alt: "Inceptrix Hackathon participants", position: "center 42%" },
  { src: communityAudience.url, alt: "A packed audience at a Vybe Driven community session", position: "center 45%" },
  { src: computerLab, alt: "Students coding in a massive computer lab", position: "center 45%" },
];

const partnerLogos = [
  { logo: "/partners/partner-1.jpg" },{ logo: "/partners/partner-10.png" },{ logo: "/partners/partner-11.jpeg" },{ logo: "/partners/partner-12.jpeg" },{ logo: "/partners/partner-13.jpeg" },{ logo: "/partners/partner-14.jpeg" },{ logo: "/partners/partner-15.jpeg" },{ logo: "/partners/partner-16.jpeg" },{ logo: "/partners/partner-17.jpeg" },{ logo: "/partners/partner-18.jpeg" },{ logo: "/partners/partner-19.jpeg" },{ logo: "/partners/partner-2.png" },{ logo: "/partners/partner-20.jpeg" },{ logo: "/partners/partner-21.jpg" },{ logo: "/partners/partner-3.jpg" },{ logo: "/partners/partner-4.png" },{ logo: "/partners/partner-5.png" },{ logo: "/partners/partner-6.jpg" },{ logo: "/partners/partner-7.png" },{ logo: "/partners/partner-8.png" },{ logo: "/partners/partner-9.jpg" }
];

const collegeLogos = [
  { logo: "/colleges/college-1.jpeg" },{ logo: "/colleges/college-10.jpeg" },{ logo: "/colleges/college-11.jpeg" },{ logo: "/colleges/college-12.jpeg" },{ logo: "/colleges/college-13.jpeg" },{ logo: "/colleges/college-14.jpeg" },{ logo: "/colleges/college-15.jpeg" },{ logo: "/colleges/college-16.jpeg" },{ logo: "/colleges/college-2.jpeg" },{ logo: "/colleges/college-3.jpeg" },{ logo: "/colleges/college-4.jpeg" },{ logo: "/colleges/college-5.jpeg" },{ logo: "/colleges/college-6.jpeg" },{ logo: "/colleges/college-7.jpeg" },{ logo: "/colleges/college-8.jpeg" },{ logo: "/colleges/college-9.jpeg" }
];

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Events />
        <Features />
        <Why />
        <Community />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero-stage relative -mt-20 flex min-h-[min(780px,92vh)] items-end overflow-hidden pt-36 pb-14 sm:pb-20">
      <div className="hero-media absolute inset-0" aria-live="off">
        {heroSlides.map((slide, index) => (
          <img key={slide.src} src={slide.src} alt={index === activeSlide ? slide.alt : ""} aria-hidden={index !== activeSlide} style={{ objectPosition: slide.position }} className={`hero-slide absolute inset-0 h-full w-full object-cover ${index === activeSlide ? "is-active" : ""}`} />
        ))}
      </div>
      <div className="hero-scrim absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[1200px] px-6">
        <div className="animate-rise max-w-[710px]">
          <h1 className="text-[44px] font-extrabold leading-[0.98] text-hero-foreground sm:text-6xl lg:text-[76px]">
            Build. Hack.<br />Drive the <span className="text-hero-accent">Future.</span>
          </h1>
          <p className="mt-6 max-w-[590px] text-lg text-hero-muted sm:text-xl">
            Discover hackathons, competitions and technology events built for ambitious developers, creators and innovators.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <PrimaryBtn>Explore Hackathons <ArrowRight className="size-4" /></PrimaryBtn>
            <GhostBtn href="/contact" className="hero-ghost">Host an Event</GhostBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatCard({ className, icon, v, l }: { className: string; icon: React.ReactNode; v: string; l: string }) {
  return (
    <div className={`glass animate-floaty absolute flex items-center gap-3 rounded-xl border border-border px-4 py-3 ${className}`}>
      <span className="grid size-8 place-items-center rounded-lg bg-neon/15 text-neon">{icon}</span>
      <div><p className="text-sm font-bold leading-none">{v}</p><p className="mt-1 text-xs text-muted-foreground">{l}</p></div>
    </div>
  );
}

function Stats() {
  const s = [
    { v: "25.4K+", l: "Registrations", i: Users },
    { v: "186.3K+", l: "Community Reach", i: Radio },
    { v: "33+", l: "Events Hosted", i: Calendar },
    { v: "₹322K+", l: "Prize Pool", i: Trophy },
  ];
  return (
    <section className="mx-auto max-w-[1200px] px-6">
      <Reveal>
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-border bg-surface shadow-glow-soft lg:grid-cols-4">
          {s.map(({ v, l, i: I }, idx) => (
            <div key={l} className={`p-6 sm:p-8 ${idx % 2 ? "border-l" : ""} ${idx > 1 ? "border-t lg:border-t-0" : ""} ${idx === 2 ? "lg:border-l" : ""}`}>
              <I className="size-5 text-neon" />
              <p className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Partners() {
  const renderRow = (items: { logo: string }[], direction: "left" | "right") => (
    <div className="partner-window">
      <div className={`partner-track partner-track-${direction}`}>
        {[...items, ...items].map((partner, index) => (
          <div key={`${partner.logo}-${index}`} className="partner-logo" aria-hidden={index >= items.length}>
            <img src={partner.logo} alt="" loading="eager" decoding="async" />
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <section className="partner-band relative overflow-hidden border-b border-border bg-background py-10 sm:py-12" aria-labelledby="partners-title">
      <div className="pointer-events-none absolute inset-x-[15%] top-1/2 h-44 -translate-y-1/2 rounded-full bg-neon/5 blur-3xl" />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <p id="partners-title" className="mb-7 text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground sm:mb-8 sm:text-sm">TRUSTED BY AMAZING PARTNERS & COLLEGES</p>
        <div className="space-y-6 sm:space-y-8">
          {renderRow(partnerLogos, "right")}
          {renderRow(collegeLogos, "left")}
        </div>
      </div>
    </section>
  );
}

function Events() {
  const [f, setF] = useState<HomeFilter>("All");
  const featured = opportunities.find((item) => item.slug === "vecna-verse-2026");
  if (!featured) return null;
  const list = opportunities
    .filter((item) => item.slug !== featured.slug && matchesHomeFilter(item, f))
    .sort((a, b) => Number(a.status === "Opening soon") - Number(b.status === "Opening soon"))
    .slice(0, 9);
  return (
    <section id="events" className="mx-auto max-w-[1200px] scroll-mt-28 px-6 py-12">
      <Reveal>
        <Eyebrow>DISCOVER</Eyebrow>
        <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">Find Your <span className="text-gradient">Next<br />Hackathon.</span></h2>
          <p className="max-w-md text-muted-foreground">Explore challenges, competitions and events where ambitious builders turn ideas into reality.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((x) => (
            <button key={x} onClick={() => setF(x)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${f === x ? "bg-neon text-primary-foreground" : "border border-border bg-surface text-muted-foreground hover:text-foreground"}`}>
              {x}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <article className="group grid overflow-hidden rounded-3xl border border-neon/25 bg-surface shadow-glow-soft md:grid-cols-[1.2fr_1fr]">
          <div className="relative overflow-hidden">
            <img src={featured.image} alt={featured.title} loading="lazy" width={1280} height={768} className="h-full min-h-64 w-full bg-background object-contain transition duration-700 group-hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80" />
            <span className="absolute left-5 top-5 rounded-full bg-neon px-3 py-1 text-xs font-bold text-primary-foreground">FEATURED</span>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <p className="text-xs font-semibold tracking-[0.18em] text-neon">{featured.tag.toUpperCase()}</p>
            <h3 className="mt-3 text-4xl font-extrabold tracking-tight">{featured.title}</h3>
            <p className="mt-3 text-muted-foreground">{featured.description}</p>
            <div className="mt-6 space-y-2.5 text-sm">
              <p className="flex items-center gap-2"><Globe className="size-4 text-neon" /> {featured.format}</p>
              <p className="flex items-center gap-2"><Calendar className="size-4 text-neon" /> {featured.date}</p>
              <p className="flex items-center gap-2"><Trophy className="size-4 text-neon" /> {featured.prize} Prize Pool</p>
            </div>
            <Link to="/opportunities/$slug" params={{ slug: featured.slug }} className="mt-8 inline-flex self-start items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 hover:shadow-glow">Explore Event <ArrowRight className="size-4" /></Link>
          </div>
        </article>
      </Reveal>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e, i) => (
          <Reveal key={e.title} delay={i * 60}>
            <Link to="/opportunities/$slug" params={{ slug: e.slug }} aria-label={`View ${e.title} details`} className="group block h-full rounded-[22px] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"><article className="flex h-full flex-col overflow-hidden rounded-[22px] border border-border bg-surface transition duration-300 group-hover:-translate-y-1.5 group-hover:border-neon/40 group-hover:shadow-glow">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={e.image} alt={e.title} loading="lazy" width={1024} height={640} style={e.imagePosition ? { objectPosition: e.imagePosition } : undefined} className={`h-full w-full bg-surface transition duration-700 group-hover:scale-[1.02] ${e.imageFit === "contain" ? "object-contain" : "object-cover"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent" />
                <span className="glass absolute left-4 top-4 rounded-full border border-border px-3 py-1 text-[11px] font-semibold">{e.tag}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="size-3.5 text-neon" />{e.date}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="size-3.5 text-neon" />{e.location}</span>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <div><p className="text-[11px] text-muted-foreground">{e.prize ? "Prize Pool" : "Status"}</p><p className="font-bold text-lime">{e.prize ?? e.status}</p></div>
                   <span className="flex items-center gap-1 text-sm font-semibold transition group-hover:text-neon">View Event <ArrowRight className="size-4" /></span>
                </div>
              </div>
             </article></Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const f = [
    { i: Search, t: "Discover Events", d: "Browse hackathons and competitions filtered to your stack and interests." },
    { i: UsersRound, t: "Team Up", d: "Find teammates with complementary skills before the clock starts." },
    { i: Rocket, t: "Build & Submit", d: "Ship your project and submit demos, repos and decks in one place." },
    { i: LineChart, t: "Track Progress", d: "Follow milestones, deadlines and judging rounds in real time." },
    { i: Swords, t: "Compete", d: "Go head to head with the sharpest builders across India and beyond." },
    { i: Award, t: "Get Recognized", d: "Earn prizes, badges and a profile that recruiters actually look at." },
  ];
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-14">
      <Reveal>
        <Eyebrow>BUILT FOR BUILDERS</Eyebrow>
        <h2 className="mt-3 text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">Everything You Need<br />to <span className="text-gradient">Build What's Next.</span></h2>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {f.map(({ i: I, t, d }, idx) => (
          <Reveal key={t} delay={idx * 50}>
            <div className="group h-full rounded-2xl border border-border bg-surface p-7 transition hover:border-neon/30">
              <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-neon transition group-hover:bg-neon group-hover:text-primary-foreground"><I className="size-5" /></span>
              <h3 className="mt-5 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Why() {
  const w = [
    { n: "01", i: Zap, t: "Powerful Innovation", d: "Challenges designed with industry partners around problems that matter now." },
    { n: "02", i: Globe, t: "Open Community", d: "A welcoming place for students, independent builders and working professionals." },
    { n: "03", i: Activity, t: "Real-Time Experience", d: "Live updates, leaderboards and announcements from kickoff to final demo." },
    { n: "04", i: Code2, t: "Built for Developers", d: "Clean workflows, GitHub-first submissions and zero unnecessary friction." },
  ];
  return (
    <section className="relative py-14">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-80 max-w-3xl -translate-y-1/2 rounded-full bg-neon/8 blur-[120px]" />
      <div className="relative mx-auto max-w-[1200px] px-6">
        <Reveal className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Why <span className="text-gradient">Vybe Driven?</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">More than events. It's an ecosystem built to turn ideas into impact.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {w.map(({ n, i: I, t, d }, idx) => (
            <Reveal key={n} delay={idx * 70}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface-2 to-background p-8 sm:p-10">
                <span className="absolute -right-2 -top-6 text-[140px] font-black leading-none text-neon/10">{n}</span>
                <I className="relative size-6 text-neon" />
                <h3 className="relative mt-8 text-2xl font-bold">{t}</h3>
                <p className="relative mt-3 max-w-sm text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Community() {
  const g = [
    { img: communityAudience.url, l: "Community Sessions", c: "md:col-span-2 md:row-span-2", position: "center 45%" },
    { img: communityTalk.url, l: "Tech Talks", c: "", position: "center 48%" },
    { img: hackathonHall, l: "AI Community", c: "md:col-span-2", position: "center 48%" },
    { img: communityGroup.url, l: "Together We Build", c: "md:col-span-4", position: "center 42%" },
  ];
  return (
    <section id="community" className="mx-auto max-w-[1200px] scroll-mt-28 px-6 py-14">
      <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Eyebrow>COMMUNITY</Eyebrow>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Built by the <span className="text-gradient">Community</span></h2>
        </div>
        <p className="max-w-sm text-muted-foreground">Meet the people who build, compete and create together.</p>
      </Reveal>
      <div className="mt-10 grid auto-rows-[220px] gap-4 md:grid-cols-4">
        {g.map((x) => (
          <div key={x.l} className={`group relative overflow-hidden rounded-2xl ${x.c}`}>
            <img src={x.img} alt={x.l} loading="lazy" style={{ objectPosition: x.position }} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent transition group-hover:bg-neon/15" />
            <span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm font-semibold"><Sparkles className="size-3.5 text-neon" />{x.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-neon/20 bg-surface-3 px-8 py-14 text-center sm:px-16">
          <div className="bg-grid pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute -bottom-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-neon/20 blur-[120px]" />
          <div className="relative">
            <h2 className="text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">Ready to<br /><span className="text-gradient">Drive What's Next?</span></h2>
            <p className="mx-auto mt-5 max-w-lg text-muted-foreground">Find your next challenge, build with great people and turn your ideas into something real.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryBtn href="/hackathons">Explore Hackathons <ArrowRight className="size-4" /></PrimaryBtn>
              <GhostBtn href="/auth?mode=signin&next=%2Fprofile">Join Vybe Driven</GhostBtn>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
