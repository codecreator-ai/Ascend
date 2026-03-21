import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle2,
  Clock,
  Loader2,
  CalendarCheck,
  User,
  BookOpen,
  ChevronRight,
  Lock,
  Calendar,
} from "lucide-react";

const TUTORS = ["Arth Arun", "Arnav Nethi", "Paavan Bajaj"];
const SUBJECTS = ["Math", "Science", "English", "History", "Other"];
const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface AvailabilitySlot {
  id: string;
  tutor_name: string;
  day: string;
  time_slot: string;
  is_booked: boolean;
}

interface Booking {
  id: string;
  subject: string;
  tutor: string;
  time_slot: string;
  created_at: string;
}

export default function BookingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState(user?.user_metadata?.full_name || user?.user_metadata?.name || "");
  const [subject, setSubject] = useState("");
  const [tutor, setTutor] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [reason, setReason] = useState("");
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    subject: string;
    tutor: string;
    timeSlot: string;
  } | null>(null);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch and subscribe to availability in real-time
  useEffect(() => {
    const fetchAvailability = async () => {
      const { data, error } = await supabase
        .from("availability")
        .select("*")
        .order("day")
        .order("time_slot");

      if (!error && data) {
        setAvailability(data as AvailabilitySlot[]);
      }
    };

    fetchAvailability();

    // Real-time subscription
    const channel = supabase
      .channel("availability-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "availability" },
        (payload) => {
          setAvailability((prev) =>
            prev.map((slot) =>
              slot.id === payload.new.id ? (payload.new as AvailabilitySlot) : slot
            )
          );
          // Clear selection if that slot just got booked by someone else
          if (payload.new.id === selectedSlotId && payload.new.is_booked) {
            setSelectedSlotId("");
            toast({
              title: "Slot just booked",
              description: "That time slot was just taken. Please choose another.",
              variant: "destructive",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedSlotId, toast]);

  // Fetch user's bookings when submitted or on mount
  useEffect(() => {
    if (!user) return;
    const fetchMyBookings = async () => {
      setBookingsLoading(true);
      const { data } = await supabase
        .from("bookings")
        .select("id, subject, tutor, time_slot, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setMyBookings(data as Booking[]);
      setBookingsLoading(false);
    };
    fetchMyBookings();
  }, [user, submitted]);

  const tutorSlots = tutor
    ? availability.filter((s) => s.tutor_name === tutor)
    : [];

  const slotsByDay = tutorSlots.reduce<Record<string, AvailabilitySlot[]>>(
    (acc, slot) => {
      if (!acc[slot.day]) acc[slot.day] = [];
      acc[slot.day].push(slot);
      return acc;
    },
    {}
  );

  const sortedDays = DAYS_ORDER.filter((d) => slotsByDay[d]);

  const selectedSlot = availability.find((s) => s.id === selectedSlotId);

  const canSubmit =
    name.trim() &&
    subject &&
    tutor &&
    selectedSlotId &&
    reason.trim().length >= 10;

  const handleSubmit = async () => {
    if (!user || !canSubmit || !selectedSlot) return;
    setLoading(true);

    try {
      // 1. Mark slot as booked (atomic check: only works if still is_booked = false)
      const { error: slotError, count } = await supabase
        .from("availability")
        .update({ is_booked: true })
        .eq("id", selectedSlotId)
        .eq("is_booked", false);

      if (slotError || count === 0) {
        toast({
          title: "Slot unavailable",
          description: "This slot was just booked by someone else. Please choose another.",
          variant: "destructive",
        });
        setSelectedSlotId("");
        setLoading(false);
        return;
      }

      // 2. Insert booking record
      const { error: bookingError } = await supabase.from("bookings").insert({
        user_id: user.id,
        name: name.trim(),
        email: user.email!,
        subject,
        tutor,
        availability_id: selectedSlotId,
        time_slot: `${selectedSlot.day} – ${selectedSlot.time_slot}`,
        reason: reason.trim(),
      });

      if (bookingError) throw bookingError;

      // 3. Send notification email (non-blocking)
      supabase.functions
        .invoke("send-booking-email", {
          body: {
            studentName: name.trim(),
            studentEmail: user.email,
            subject,
            tutor,
            timeSlot: `${selectedSlot.day} – ${selectedSlot.time_slot}`,
            reason: reason.trim(),
          },
        })
        .catch((err) => console.error("Email send error:", err));

      setConfirmedBooking({
        subject,
        tutor,
        timeSlot: `${selectedSlot.day} – ${selectedSlot.time_slot}`,
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      toast({
        title: "Booking failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  if (submitted && confirmedBooking) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-lg w-full">
            {/* Success header */}
            <div className="text-center mb-8">
              <div className="h-20 w-20 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-6">
                <CalendarCheck className="h-10 w-10 text-accent" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Session Booked!</h1>
              <p className="text-muted-foreground text-base">
                You have successfully booked a tutoring session. A confirmation email has been sent to <span className="font-medium text-foreground">{user?.email}</span>.
              </p>
            </div>

            {/* Booking details card */}
            <Card className="shadow-sm border border-border mb-6">
              <div className="bg-primary px-6 py-4 rounded-t-lg border-b-2 border-accent">
                <p className="text-primary-foreground font-semibold text-sm uppercase tracking-wider">Booking Confirmation</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-border">
                  <BookOpen className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Subject</p>
                    <p className="font-semibold text-foreground text-base">{confirmedBooking.subject}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-border">
                  <User className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Tutor</p>
                    <p className="font-semibold text-foreground text-base">{confirmedBooking.tutor}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Date & Time</p>
                    <p className="font-semibold text-foreground text-base">{confirmedBooking.timeSlot}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <Link to="/dashboard">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6">
                  Go to Dashboard
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="border-border font-semibold px-6">Back to Home</Button>
              </Link>
            </div>

            {/* All booked sessions */}
            <div className="w-full">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Your Booked Sessions
              </h2>
              {bookingsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : myBookings.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-6">No sessions found.</p>
              ) : (
                <div className="space-y-3">
                  {myBookings.map((b) => (
                    <div key={b.id} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <BookOpen className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm">{b.subject}</p>
                        <p className="text-xs text-muted-foreground">{b.tutor} · {b.time_slot}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0">Booked</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-primary font-medium">Book a Session</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Book a Tutoring Session</h1>
          <p className="text-muted-foreground mt-1">
            Fill out the form and select an available time that works for you.
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* RIGHT: Availability Calendar — shown first on mobile */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Card className="shadow-sm border-border/60">
              <CardContent className="p-6 space-y-5">

                {/* Student Identity */}
                <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-secondary/10 text-secondary font-semibold text-sm">
                      {(user.user_metadata?.full_name || user.email || "U")
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary text-sm">
                      {user.user_metadata?.full_name || user.user_metadata?.name || "Student"}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium text-primary">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="bg-background"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-primary">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select a subject…" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tutor */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-primary">Tutor</Label>
                  <Select
                    value={tutor}
                    onValueChange={(v) => {
                      setTutor(v);
                      setSelectedSlotId("");
                    }}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Choose a tutor…" />
                    </SelectTrigger>
                    <SelectContent>
                      {TUTORS.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Reason */}
                <div className="space-y-1.5">
                  <Label htmlFor="reason" className="text-sm font-medium text-primary">
                    Reason for Tutoring
                  </Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="I want help improving my understanding of calculus derivatives…"
                    rows={4}
                    className="bg-background resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {reason.length < 10
                      ? `Minimum 10 characters (${10 - reason.length} more)`
                      : `${reason.length} characters`}
                  </p>
                </div>

                {/* Selected slot preview */}
                {selectedSlot && (
                  <div className="flex items-center gap-2 p-3 bg-secondary/8 border border-secondary/20 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                    <p className="text-sm text-primary">
                      <span className="font-medium">{selectedSlot.day}</span>
                      {" · "}
                      {selectedSlot.time_slot}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit || loading}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Booking…
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>

                {!canSubmit && !loading && (
                  <p className="text-xs text-muted-foreground text-center">
                    {!tutor
                      ? "Select a tutor to see available times →"
                      : !selectedSlotId
                      ? "Select a time slot on the right →"
                      : "Complete all fields to continue"}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Availability Calendar */}
          {/* LEFT: Booking Form — shown second on mobile */}
          <div className="lg:col-span-2 space-y-5 order-2 lg:order-1">
            <Card className="shadow-sm border-border/60 h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-semibold text-primary">Tutor Availability</h2>
                  {tutor && (
                    <Badge variant="secondary" className="text-xs">
                      {tutor}
                    </Badge>
                  )}
                </div>

                {!tutor ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-primary">Select a tutor first</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Available time slots will appear here
                    </p>
                  </div>
                ) : sortedDays.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mb-3" />
                    <p className="text-muted-foreground text-sm">Loading availability…</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {sortedDays.map((day) => (
                      <div key={day}>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          {day}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {slotsByDay[day]
                            .sort((a, b) => a.time_slot.localeCompare(b.time_slot))
                            .map((slot) => {
                              const isSelected = selectedSlotId === slot.id;
                              const isBooked = slot.is_booked;

                              return (
                                <button
                                  key={slot.id}
                                  disabled={isBooked}
                                  onClick={() => setSelectedSlotId(isSelected ? "" : slot.id)}
                                  className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all
                                    ${
                                      isBooked
                                        ? "bg-muted/40 border-border/40 cursor-not-allowed opacity-50"
                                        : isSelected
                                        ? "bg-secondary/10 border-secondary ring-1 ring-secondary shadow-sm"
                                        : "bg-background border-border hover:border-secondary/50 hover:bg-secondary/5 cursor-pointer"
                                    }
                                  `}
                                >
                                  <div
                                    className={`h-8 w-8 rounded-md flex items-center justify-center shrink-0 ${
                                      isBooked
                                        ? "bg-muted"
                                        : isSelected
                                        ? "bg-secondary/20"
                                        : "bg-muted"
                                    }`}
                                  >
                                    {isBooked ? (
                                      <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                                    ) : isSelected ? (
                                      <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
                                    ) : (
                                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                    )}
                                  </div>
                                  <div>
                                    <p
                                      className={`text-sm font-medium ${
                                        isBooked ? "text-muted-foreground" : "text-primary"
                                      }`}
                                    >
                                      {slot.time_slot}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {isBooked ? "Unavailable" : "Available"}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center gap-4 pt-2 border-t border-border/60 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-secondary/30 border border-secondary" />
                        <span>Selected</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-muted border border-border" />
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-muted/40 opacity-50 border border-border/40" />
                        <span>Booked</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
