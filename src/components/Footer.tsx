import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6 text-accent" />
              <span className="text-lg font-bold">Ascend Academics</span>
            </div>
            <p className="text-sm text-primary-foreground/70 max-w-xs leading-relaxed">
              Affordable, trusted tutoring from top local students who truly understand how to help your child succeed.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/50">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/courses" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Courses</Link>
              <Link to="/tutors" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Tutors</Link>
              <Link to="/pricing" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Pricing</Link>
              <Link to="/booking" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Book a Session</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/50">Contact</h4>
            <p className="text-sm text-primary-foreground/70">hello@ascendacademics.com</p>
            <p className="text-sm text-primary-foreground/70 mt-1">Your local community</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs text-primary-foreground/40">
          © 2026 Ascend Academics. Built with care by students, for students.
        </div>
      </div>
    </footer>
  );
}
