import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pricingPlans } from "@/data/mock";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary leading-tight">Simple, Affordable Pricing</h1>
          <p className="mt-3 text-muted-foreground text-lg">
            Affordable tutoring designed for families. No contracts, no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <Card key={plan.id} className={`relative h-full ${plan.popular ? "border-accent shadow-lg ring-1 ring-accent/30" : "hover:shadow-md"} transition-all`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-accent text-accent-foreground border-0 font-semibold px-3">Most Popular</Badge>
                </div>
              )}
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <h3 className="font-semibold text-primary text-xl">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                <div className="mt-5 mb-6">
                  <span className="text-5xl font-bold text-primary">${plan.price}</span>
                  {"pricePerSession" in plan && (
                    <span className="text-sm text-muted-foreground ml-2">(${plan.pricePerSession}/session)</span>
                  )}
                </div>
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/booking" className="mt-8">
                  <Button
                    className={`w-full font-semibold active:scale-[0.97] transition-all ${
                      plan.popular ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 space-y-2">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-secondary" />
            No long-term commitment required
          </p>
          <p className="text-sm text-muted-foreground">
            Trusted by local families · Top-performing student tutors
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
