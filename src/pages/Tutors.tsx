import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tutors } from "@/data/mock";
import { ArrowRight } from "lucide-react";

export default function TutorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-2xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary leading-tight">Our Tutors</h1>
          <p className="mt-3 text-muted-foreground text-lg">Top-performing high school students dedicated to helping your child succeed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutors.map((tutor) => (
            <Card key={tutor.id} className="hover:shadow-lg transition-all h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col items-center sm:items-start shrink-0">
                    <Avatar className="h-24 w-24 ring-2 ring-secondary/20 ring-offset-2 ring-offset-background">
                      <AvatarFallback className="bg-secondary/10 text-secondary text-2xl font-semibold">
                        {tutor.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Badge variant="secondary" className="mt-3 bg-secondary/10 text-secondary border-0 font-medium">
                      {tutor.gpa}
                    </Badge>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-primary">{tutor.name}</h3>
                    <p className="text-sm text-muted-foreground">{tutor.school}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3 justify-center sm:justify-start">
                      {tutor.achievements.map((a) => (
                        <Badge key={a} variant="outline" className="text-xs font-normal">{a}</Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2 justify-center sm:justify-start">
                      {tutor.subjects.map((s) => (
                        <Badge key={s} className="bg-accent/10 text-accent border-0 text-xs">{s}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-4 italic">"{tutor.bio}"</p>
                    <Link to="/booking" className="inline-block mt-4">
                      <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold active:scale-[0.97] transition-all">
                        Book with {tutor.name.split(" ")[0]}
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
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
