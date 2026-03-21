import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tutors, testimonials, pricingPlans } from "@/data/mock";
import {
  Users,
  Heart,
  DollarSign,
  MapPin,
  Calculator,
  BookOpen,
  FlaskConical,
  Brain,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Quote,
  Star,
} from "lucide-react";
import { useEffect, useRef } from "react";

const subjectIcons: Record<string, React.ReactNode> = {
  calculator: <Calculator className="h-7 w-7" />,
  "book-open": <BookOpen className="h-7 w-7" />,
  "flask-conical": <FlaskConical className="h-7 w-7" />,
  brain: <Brain className="h-7 w-7" />,
};

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-in");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-5 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Rocket SVG Hero Graphic ──────────────────────── */
function RocketScene() {
  return (
    <div className="relative w-full h-full select-none pointer-events-none">
      {/* Starfield */}
      {[
        { cx: "15%", cy: "18%", r: 2, delay: "0s" },
        { cx: "72%", cy: "8%", r: 1.5, delay: "0.6s" },
        { cx: "88%", cy: "32%", r: 2.5, delay: "1.2s" },
        { cx: "42%", cy: "12%", r: 1.5, delay: "0.3s" },
        { cx: "60%", cy: "55%", r: 2, delay: "1.8s" },
        { cx: "92%", cy: "62%", r: 1.5, delay: "0.9s" },
        { cx: "28%", cy: "45%", r: 2, delay: "2.1s" },
        { cx: "78%", cy: "80%", r: 1.5, delay: "0.4s" },
        { cx: "10%", cy: "70%", r: 2, delay: "1.5s" },
        { cx: "50%", cy: "88%", r: 1.5, delay: "0.7s" },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-accent animate-twinkle"
          style={{
            left: s.cx,
            top: s.cy,
            width: s.r * 2,
            height: s.r * 2,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* Rocket */}
      <div className="absolute animate-rocket" style={{ bottom: "18%", left: "12%" }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          {/* Body */}
          <path
            d="M32 6 C22 14 18 28 18 40 L32 46 L46 40 C46 28 42 14 32 6Z"
            fill="hsl(43,85%,52%)"
            stroke="hsl(43,60%,38%)"
            strokeWidth="1.2"
          />
          {/* Window */}
          <circle cx="32" cy="28" r="6" fill="hsl(220,35%,15%)" stroke="hsl(43,85%,52%)" strokeWidth="1.5" />
          <circle cx="32" cy="28" r="3.5" fill="hsl(220,30%,22%)" />
          {/* Fins */}
          <path d="M18 40 L10 52 L22 46Z" fill="hsl(43,70%,42%)" />
          <path d="M46 40 L54 52 L42 46Z" fill="hsl(43,70%,42%)" />
          {/* Flame */}
          <path d="M26 46 C26 54 29 58 32 60 C35 58 38 54 38 46Z" fill="hsl(24,100%,60%)" opacity="0.9" />
          <path d="M28 46 C28 52 30.5 56 32 58 C33.5 56 36 52 36 46Z" fill="hsl(48,100%,68%)" />
        </svg>
      </div>

      {/* Floating graduation cap */}
      <div className="absolute animate-float-slow" style={{ top: "14%", right: "15%", animationDelay: "1s" }}>
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
          <GraduationCap className="h-8 w-8 text-accent" />
        </div>
      </div>

      {/* Floating book */}
      <div className="absolute animate-float" style={{ bottom: "28%", right: "22%", animationDelay: "0.5s" }}>
        <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center shadow-lg">
          <BookOpen className="h-6 w-6 text-accent" />
        </div>
      </div>

      {/* Floating star cluster */}
      <div className="absolute animate-float" style={{ top: "40%", left: "20%", animationDelay: "2s" }}>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <Star key={i} className="h-4 w-4 text-accent fill-accent" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>

      {/* Orbit ring around graduation cap */}
      <div className="absolute" style={{ top: "6%", right: "7%", width: 80, height: 80 }}>
        <div className="absolute inset-0 rounded-full border border-accent/15" style={{ borderStyle: "dashed" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-orbit">
            <div className="w-3 h-3 rounded-full bg-accent" />
          </div>
        </div>
      </div>

      {/* Decorative arc line */}
      <svg
        className="absolute bottom-0 left-0 w-full h-24 opacity-10"
        viewBox="0 0 400 100"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80 Q100 20 200 60 Q300 100 400 30"
          stroke="hsl(43,85%,52%)"
          strokeWidth="1.5"
          strokeDasharray="300"
          strokeDashoffset="0"
          style={{
            animation: "draw-line 2.5s ease-out forwards",
          }}
        />
      </svg>
    </div>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 animate-gradient pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, hsl(220,35%,7%) 0%, hsl(230,40%,10%) 40%, hsl(220,35%,8%) 70%, hsl(215,45%,9%) 100%)",
          }}
        />
        {/* Subtle radial glow */}
        <div
          className="absolute top-0 right-0 w-[60%] h-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 80% 30%, hsl(43,85%,52%,0.07) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 w-full py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <div className="animate-slide-up">
                <Badge className="mb-6 bg-accent/15 text-accent border border-accent/30 font-medium px-3 py-1 text-sm">
                  <GraduationCap className="h-3.5 w-3.5 mr-1.5" />
                  Built by top-performing students
                </Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] text-foreground animate-slide-up-2">
                Raise Your Child's Grades with <span style={{ color: "hsl(43,85%,52%)" }}>Personalized</span> Tutoring
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed animate-slide-up-3">
                Trusted by families in your community. Math, English, and Science tutoring from relatable,
                high-achieving student tutors.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 animate-slide-up-4">
                <Link to="/booking">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-md active:scale-[0.97] transition-all text-base px-7 h-12"
                  >
                    Get Started — $20/session
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-medium text-base px-7 h-12 border-border/60 hover:border-accent/50 active:scale-[0.97] transition-all"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-muted-foreground flex items-center gap-1.5 animate-slide-up-4">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                No long-term commitment · Cancel anytime
              </p>
            </div>

            {/* Right: Rocket animation */}
            <div className="relative h-80 lg:h-96">
              <RocketScene />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────── */}
      <div className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "3", label: "Expert Tutors" },
              { val: "4.9★", label: "Average Rating" },
              { val: "$20", label: "Per Session" },
              { val: "K–12", label: "Grade Range" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-accent">{val}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why Parents Choose Us ─────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <RevealSection>
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">Why Parents Choose Us</h2>
            <p className="mt-3 text-muted-foreground">Real advantages that make a measurable difference</p>
          </div>
        </RevealSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Users className="h-6 w-6" />,
              title: "Relatable Tutors",
              desc: "Students who recently mastered the same material and know how to explain it",
            },
            {
              icon: <Heart className="h-6 w-6" />,
              title: "Personal Attention",
              desc: "1-on-1 sessions fully tailored to your child's learning style and pace",
            },
            {
              icon: <DollarSign className="h-6 w-6" />,
              title: "Affordable Pricing",
              desc: "Quality tutoring at a fraction of the cost of traditional centers",
            },
            {
              icon: <MapPin className="h-6 w-6" />,
              title: "Community-Driven",
              desc: "Local students invested in helping their own community succeed",
            },
          ].map((item, i) => (
            <RevealSection key={i}>
              <Card className="border border-border hover:border-accent/30 transition-colors h-full bg-card">
                <CardContent className="p-6">
                  <div className="h-11 w-11 rounded-lg bg-accent/10 border border-accent/15 text-accent flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── What We Teach ─────────────────────────────── */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <RevealSection>
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">What We Teach</h2>
              <p className="mt-3 text-muted-foreground">Comprehensive academic support across core subjects</p>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "calculator",
                subject: "Mathematics",
                benefit: "Build strong foundations from arithmetic to calculus",
              },
              {
                icon: "book-open",
                subject: "English & Writing",
                benefit: "Develop clear communication and writing skills",
              },
              {
                icon: "flask-conical",
                subject: "Science",
                benefit: "Spark curiosity through clear, engaging explanations",
              },
              {
                icon: "brain",
                subject: "Study Skills",
                benefit: "Learn how to learn — the skill that powers every subject",
              },
            ].map((item, i) => (
              <RevealSection key={i}>
                <Card className="group hover:border-accent/30 transition-all border border-border h-full bg-background">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 border border-accent/15 text-accent flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      {subjectIcons[item.icon]}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.subject}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.benefit}</p>
                  </CardContent>
                </Card>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the Tutors ───────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <RevealSection>
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">Meet Our Tutors</h2>
            <p className="mt-3 text-muted-foreground">Top-performing students dedicated to your child's success</p>
          </div>
        </RevealSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((tutor) => (
            <RevealSection key={tutor.id}>
              <Card className="overflow-hidden hover:border-accent/30 transition-all h-full border border-border">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="relative mb-3">
                      <Avatar className="h-20 w-20 ring-2 ring-accent/30 ring-offset-2 ring-offset-card">
                        <AvatarFallback className="bg-accent/10 text-accent text-lg font-bold">
                          {tutor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <h3 className="font-semibold text-foreground">{tutor.name}</h3>
                    <p className="text-xs text-muted-foreground">{tutor.school}</p>
                    <Badge className="mt-2 text-xs bg-accent/15 text-accent border border-accent/20 font-semibold">
                      {tutor.gpa}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {tutor.achievements.slice(0, 2).map((a) => (
                      <Badge key={a} variant="outline" className="text-xs font-normal border-border/60">
                        {a}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed text-center italic">"{tutor.bio}"</p>
                </CardContent>
              </Card>
            </RevealSection>
          ))}
        </div>
        <RevealSection className="text-center mt-10">
          <Link to="/tutors">
            <Button
              variant="outline"
              className="font-medium border-border/60 hover:border-accent/40 active:scale-[0.97] transition-all"
            >
              View All Tutors
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </RevealSection>
      </section>

      {/* ── Pricing ───────────────────────────────────── */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <RevealSection>
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Simple, Affordable Pricing
              </h2>
              <p className="mt-3 text-muted-foreground">Quality tutoring designed for families — no hidden fees</p>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <RevealSection key={plan.id}>
                <Card
                  className={`relative h-full transition-all border ${
                    plan.popular
                      ? "border-accent shadow-[0_0_30px_hsl(43,85%,52%,0.12)] ring-1 ring-accent/25"
                      : "border-border hover:border-accent/20"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-accent text-accent-foreground border-0 font-semibold px-3">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="font-semibold text-foreground text-lg">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                    <div className="mt-4 mb-5">
                      <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                      {"pricePerSession" in plan && (
                        <span className="text-sm text-muted-foreground ml-1">(${plan.pricePerSession}/session)</span>
                      )}
                    </div>
                    <ul className="space-y-2.5 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link to="/booking" className="mt-6">
                      <Button
                        className={`w-full font-semibold active:scale-[0.97] transition-all ${
                          plan.popular
                            ? "bg-accent text-accent-foreground hover:bg-accent/90"
                            : "border-border/60 hover:border-accent/40"
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <RevealSection>
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">Trusted by Local Families</h2>
            <p className="mt-3 text-muted-foreground">Hear what parents in our community have to say</p>
          </div>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <RevealSection key={t.id}>
              <Card className="h-full border border-border hover:border-accent/20 transition-colors">
                <CardContent className="p-6">
                  <Quote className="h-7 w-7 text-accent/40 mb-3" />
                  <p className="text-sm text-foreground/80 leading-relaxed mb-5">{t.quote}</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-accent/10 text-accent text-xs font-semibold">
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────── */}
      <section className="border-t border-border">
        <div
          className="animate-gradient"
          style={{
            background: "linear-gradient(135deg, hsl(220,35%,9%) 0%, hsl(230,42%,12%) 50%, hsl(220,35%,9%) 100%)",
            backgroundSize: "200% 200%",
          }}
        >
          <RevealSection>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-float">
                <GraduationCap className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Book Your First Session Today
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Give your child the personalized support they deserve. Start with a single session — no commitment
                required.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/booking">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-md active:scale-[0.97] transition-all text-base px-8 h-12"
                  >
                    Get Started — $20/session
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                Trusted by local families · Top-performing student tutors
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
