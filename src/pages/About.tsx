import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calculator,
  FlaskConical,
  BookOpen,
  Globe,
  Pencil,
  BarChart2,
  Music,
  Code,
  GraduationCap,
  Users,
  Star,
  Target,
} from "lucide-react";

const subjects = [
  {
    icon: Calculator,
    title: "Mathematics",
    description:
      "From algebra and geometry to AP Calculus and Statistics. We break down complex problems into simple, understandable steps.",
    levels: ["Pre-Algebra", "Algebra I & II", "Geometry", "Pre-Calculus", "AP Calculus AB/BC", "Statistics"],
  },
  {
    icon: FlaskConical,
    title: "Science",
    description:
      "Biology, Chemistry, Physics, and beyond. We make science accessible and engaging through clear explanations and real-world applications.",
    levels: ["Biology", "Chemistry", "Physics", "AP Biology", "AP Chemistry", "AP Physics"],
  },
  {
    icon: BookOpen,
    title: "English",
    description:
      "Writing, reading comprehension, literary analysis, and grammar. We help students find their voice and communicate with confidence.",
    levels: ["Grammar & Writing", "Essay Writing", "Literary Analysis", "SAT/ACT Prep", "AP English Language", "AP Literature"],
  },
  {
    icon: Globe,
    title: "History & Social Studies",
    description:
      "US History, World History, Government, and Economics. We help students understand the context behind events and ace essay exams.",
    levels: ["US History", "World History", "Government", "Economics", "AP US History", "AP World History"],
  },
  {
    icon: Pencil,
    title: "Test Preparation",
    description:
      "SAT, ACT, and other standardized tests. We provide targeted strategies to maximize your score and build confidence.",
    levels: ["SAT Math", "SAT Reading/Writing", "ACT Prep", "PSAT", "AP Exams", "Subject SATs"],
  },
  {
    icon: BarChart2,
    title: "Study Skills",
    description:
      "Time management, note-taking strategies, and learning techniques. We teach students how to learn — a skill that lasts a lifetime.",
    levels: ["Note-Taking Methods", "Time Management", "Test-Taking Strategy", "Organization", "Focus & Retention", "Study Habits"],
  },
];

const tutors = [
  {
    name: "Arth Arun",
    gpa: "4.0",
    subjects: ["Mathematics", "Science", "Study Skills"],
    bio: "Top of my class with a passion for breaking down math concepts. I believe every student can excel with the right guidance.",
    achievement: "National Merit Scholar",
  },
  {
    name: "Arnav Nethi",
    gpa: "3.97",
    subjects: ["Mathematics", "Physics", "Test Prep"],
    bio: "I struggled with math early on, which is why I know exactly where students get stuck — and how to help them break through.",
    achievement: "AP Scholar with Distinction",
  },
  {
    name: "Paavan Bajaj",
    gpa: "3.95",
    subjects: ["English", "History", "Writing"],
    bio: "Writing is a skill that unlocks every other subject. I help students write clearly, persuasively, and with confidence.",
    achievement: "State Essay Competition Winner",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="border-b bg-secondary/60 text-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <GraduationCap className="h-4 w-4" />
            About Ascend Academics
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Tutoring by Students,<br />
            <span className="text-accent">for Students</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We're local high-achieving students who remember exactly what it's like to struggle
            in class — and exactly what helped us succeed. Now we pass that knowledge on.
          </p>
          <Link to="/booking">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12 text-base"
            >
              Book a Session
            </Button>
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Target, title: "Our Mission", text: "Make expert academic support accessible and affordable for every student in our community." },
              { icon: Users, title: "Our Approach", text: "Peer-to-peer tutoring works because we recently mastered the same material and speak your language." },
              { icon: Star, title: "Our Results", text: "Students see measurable grade improvements — average 1 full letter grade within 4 sessions." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-16 border-b bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">What We Teach</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We cover all core academic subjects — from middle school through AP and college-prep levels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map(({ icon: Icon, title, description, levels }) => (
              <Card key={title} className="border border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-bold text-foreground text-base">{title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {levels.map((level) => (
                      <span
                        key={level}
                        className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border"
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tutors */}
      <section className="py-16 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Meet the Tutors</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              High-achieving local students who genuinely love helping others succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tutors.map(({ name, gpa, subjects: tutorSubjects, bio, achievement }) => {
              const initials = name.split(" ").map((n) => n[0]).join("");
              return (
                <Card key={name} className="border border-border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                        {initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-base">{name}</h3>
                        <p className="text-sm text-accent font-semibold">GPA {gpa}</p>
                        <p className="text-xs text-muted-foreground">{achievement}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{bio}"</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tutorSubjects.map((s) => (
                        <span key={s} className="text-xs bg-accent/10 text-accent border border-accent/20 px-2 py-0.5 rounded-full font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/60 text-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Ascend?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Book your first session today. $20/session — no commitments, no contracts.
          </p>
          <Link to="/booking">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12 text-base"
            >
              Book a Session
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
