export interface Tutor {
  id: string;
  name: string;
  photo: string;
  gpa: string;
  school: string;
  achievements: string[];
  subjects: string[];
  bio: string;
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  gradeRange: string;
  description: string;
  benefit: string;
  price: number;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  role: string;
  quote: string;
}

export interface TimeSlot {
  id: string;
  day: string;
  time: string;
  available: boolean;
}

export const tutors: Tutor[] = [
  {
    id: "t1",
    name: "Maya Chen",
    photo: "",
    gpa: "4.0 GPA",
    school: "Westview High School",
    achievements: ["National Honor Society", "Math Olympiad Finalist"],
    subjects: ["Math", "Science"],
    bio: "I love breaking down tough problems into simple steps. Math used to be scary for me too — now I want to help younger students feel confident with numbers.",
  },
  {
    id: "t2",
    name: "Jordan Williams",
    photo: "",
    gpa: "3.95 GPA",
    school: "Lincoln Preparatory",
    achievements: ["Debate Team Captain", "AP Scholar with Distinction"],
    subjects: ["English & Writing", "Study Skills"],
    bio: "Writing is about finding your voice. I help students organize their ideas and express themselves clearly — whether it's an essay or a book report.",
  },
  {
    id: "t3",
    name: "Priya Sharma",
    photo: "",
    gpa: "4.0 GPA",
    school: "Riverside Academy",
    achievements: ["Science Fair Gold Medalist", "Varsity Swim Team"],
    subjects: ["Science", "Math"],
    bio: "Science is all around us! I make lessons hands-on and fun so students actually enjoy learning about the world.",
  },
  {
    id: "t4",
    name: "Marcus Rodriguez",
    photo: "",
    gpa: "3.9 GPA",
    school: "Oakdale High School",
    achievements: ["Student Body President", "Peer Tutoring Lead"],
    subjects: ["Math", "Study Skills"],
    bio: "I've helped over 30 students improve their grades. My approach? Patience, practice, and making sure every question gets answered.",
  },
];

export const courses: Course[] = [
  {
    id: "c1",
    title: "Math Foundations",
    subject: "Math",
    gradeRange: "K–5",
    description: "Addition, subtraction, multiplication, division, and early problem-solving.",
    benefit: "Build strong math foundations and confidence from an early age",
    price: 20,
    icon: "calculator",
  },
  {
    id: "c2",
    title: "Pre-Algebra Mastery",
    subject: "Math",
    gradeRange: "6–8",
    description: "Equations, fractions, decimals, and intro to algebraic thinking.",
    benefit: "Build confidence in equations and problem-solving",
    price: 20,
    icon: "calculator",
  },
  {
    id: "c3",
    title: "Reading & Writing Workshop",
    subject: "English & Writing",
    gradeRange: "K–5",
    description: "Reading comprehension, vocabulary, spelling, and creative writing.",
    benefit: "Develop strong reading habits and expressive writing skills",
    price: 20,
    icon: "book-open",
  },
  {
    id: "c4",
    title: "Essay & Composition Skills",
    subject: "English & Writing",
    gradeRange: "6–8",
    description: "Structured essays, grammar, persuasive writing, and research skills.",
    benefit: "Master the art of clear, compelling writing",
    price: 20,
    icon: "book-open",
  },
  {
    id: "c5",
    title: "Science Explorers",
    subject: "Science",
    gradeRange: "K–5",
    description: "Life science, earth science, and basic physical science concepts.",
    benefit: "Spark curiosity and love for scientific discovery",
    price: 20,
    icon: "flask-conical",
  },
  {
    id: "c6",
    title: "Middle School Science",
    subject: "Science",
    gradeRange: "6–8",
    description: "Biology basics, chemistry intro, physics fundamentals, and lab skills.",
    benefit: "Build a solid science foundation for high school and beyond",
    price: 20,
    icon: "flask-conical",
  },
  {
    id: "c7",
    title: "Study Skills & Test Prep",
    subject: "Study Skills",
    gradeRange: "3–8",
    description: "Time management, note-taking, test strategies, and organization.",
    benefit: "Learn how to learn — the skill that powers every subject",
    price: 20,
    icon: "brain",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "r1",
    name: "Sarah M.",
    initials: "SM",
    role: "Parent of a 4th grader",
    quote: "My daughter went from dreading math homework to actually asking to practice. Maya is so patient and explains things in a way that just clicks.",
  },
  {
    id: "r2",
    name: "David L.",
    initials: "DL",
    role: "Parent of a 7th grader",
    quote: "Jordan helped my son improve his essay writing by two full grade levels in just six weeks. The personalized attention makes all the difference.",
  },
  {
    id: "r3",
    name: "Angela T.",
    initials: "AT",
    role: "Parent of a 2nd and 5th grader",
    quote: "Both my kids love their sessions. It's affordable, the tutors are relatable, and I can already see the improvement in their report cards.",
  },
];

export const timeSlots: TimeSlot[] = [
  { id: "ts1", day: "Monday", time: "3:30 PM", available: true },
  { id: "ts2", day: "Monday", time: "4:30 PM", available: true },
  { id: "ts3", day: "Monday", time: "5:30 PM", available: false },
  { id: "ts4", day: "Tuesday", time: "3:30 PM", available: true },
  { id: "ts5", day: "Tuesday", time: "4:30 PM", available: true },
  { id: "ts6", day: "Wednesday", time: "3:30 PM", available: true },
  { id: "ts7", day: "Wednesday", time: "4:30 PM", available: false },
  { id: "ts8", day: "Wednesday", time: "5:30 PM", available: true },
  { id: "ts9", day: "Thursday", time: "3:30 PM", available: true },
  { id: "ts10", day: "Thursday", time: "4:30 PM", available: true },
  { id: "ts11", day: "Friday", time: "3:30 PM", available: true },
  { id: "ts12", day: "Friday", time: "4:30 PM", available: true },
  { id: "ts13", day: "Saturday", time: "10:00 AM", available: true },
  { id: "ts14", day: "Saturday", time: "11:00 AM", available: true },
  { id: "ts15", day: "Saturday", time: "12:00 PM", available: false },
];

export const pricingPlans = [
  {
    id: "p1",
    name: "Single Session",
    price: 20,
    description: "Perfect for trying us out",
    features: ["1 tutoring session (50 min)", "Any subject K–8", "Choose your tutor", "No commitment"],
  },
  {
    id: "p2",
    name: "5-Session Bundle",
    price: 90,
    pricePerSession: 18,
    description: "Most popular — save $10",
    features: ["5 tutoring sessions", "Mix and match subjects", "Priority scheduling", "Progress check-in"],
    popular: true,
  },
  {
    id: "p3",
    name: "10-Session Bundle",
    price: 160,
    pricePerSession: 16,
    description: "Best value for ongoing support",
    features: ["10 tutoring sessions", "All subjects included", "Flexible scheduling", "Monthly progress report"],
  },
];
