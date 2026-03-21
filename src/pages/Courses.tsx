import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses } from "@/data/mock";
import { Calculator, BookOpen, FlaskConical, Brain, ArrowRight } from "lucide-react";

const subjectIcons: Record<string, React.ReactNode> = {
  calculator: <Calculator className="h-6 w-6" />,
  "book-open": <BookOpen className="h-6 w-6" />,
  "flask-conical": <FlaskConical className="h-6 w-6" />,
  brain: <Brain className="h-6 w-6" />,
};

const subjects = ["All", "Math", "English & Writing", "Science", "Study Skills"];

export default function CoursesPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? courses : courses.filter((c) => c.subject === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-2xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary leading-tight">Our Courses</h1>
          <p className="mt-3 text-muted-foreground text-lg">Browse our K–8 academic programs and find the right fit for your child.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {subjects.map((s) => (
            <Button
              key={s}
              variant={filter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(s)}
              className={`font-medium active:scale-[0.97] transition-all ${filter === s ? "bg-primary" : ""}`}
            >
              {s}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-all hover:-translate-y-0.5 h-full flex flex-col">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-11 w-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                    {subjectIcons[course.icon]}
                  </div>
                  <Badge variant="outline" className="text-xs">{course.gradeRange}</Badge>
                </div>
                <h3 className="font-semibold text-primary text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">{course.description}</p>
                <p className="text-sm text-secondary font-medium mb-4 italic">{course.benefit}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">${course.price}<span className="text-sm font-normal text-muted-foreground">/session</span></span>
                  <Link to="/booking">
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold active:scale-[0.97] transition-all">
                      Book Now
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
