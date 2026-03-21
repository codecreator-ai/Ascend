import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Calendar, BarChart3, LogOut, Clock, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

interface Booking {
  id: string;
  subject: string;
  tutor: string;
  time_slot: string;
  created_at: string;
}

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const sessionsRef = useRef<HTMLDivElement>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      setBookingsLoading(true);
      const { data } = await supabase
        .from("bookings")
        .select("id, subject, tutor, time_slot, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setBookings(data as Booking[]);
      setBookingsLoading(false);
    };
    fetchBookings();
  }, [user]);

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "there";
  const avatarUrl = user?.user_metadata?.avatar_url;
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const scrollToSessions = () => {
    sessionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 mx-auto max-w-4xl w-full px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback className="bg-secondary/10 text-secondary font-semibold text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-primary">Welcome back, {displayName}!</h1>
              <p className="text-muted-foreground mt-0.5">What would you like to do today?</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-primary gap-2 hidden sm:flex"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Quick-action cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <BookOpen className="h-8 w-8" />, title: "Browse Classes", desc: "Explore our K–8 courses", to: "/about" },
            { icon: <Calendar className="h-8 w-8" />, title: "Book a Session", desc: "Schedule your next session", to: "/booking" },
            { icon: <BarChart3 className="h-8 w-8" />, title: "My Sessions", desc: "View your upcoming sessions", to: null, onClick: scrollToSessions },
          ].map((item) => {
            const inner = (
              <Card className="hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer h-full group">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-primary text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            );
            return item.to ? (
              <Link to={item.to} key={item.title}>{inner}</Link>
            ) : (
              <div key={item.title} onClick={item.onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && item.onClick?.()}>{inner}</div>
            );
          })}
        </div>

        {/* My Sessions section */}
        <div ref={sessionsRef}>
          <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            My Sessions
          </h2>
          {bookingsLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : bookings.length === 0 ? (
            <Card className="border-dashed border-border">
              <CardContent className="p-10 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="font-semibold text-primary mb-1">No sessions booked yet</p>
                <p className="text-sm text-muted-foreground mb-4">Book your first tutoring session to get started.</p>
                <Link to="/booking">
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                    Book a Session
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-accent/40 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{b.subject}</p>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        {b.tutor}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {b.time_slot}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">Booked</Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile sign out */}
        <div className="mt-10 flex sm:hidden justify-center">
          <Button variant="outline" onClick={handleSignOut} className="gap-2 text-muted-foreground">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
