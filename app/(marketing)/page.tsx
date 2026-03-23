import { CTA } from "@/components/marketing/CTA";
import { DemoChat } from "@/components/marketing/DemoChat";
import { Features } from "@/components/marketing/Features";
import { Hero } from "@/components/marketing/Hero";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <DemoChat />
      <CTA />
    </>
  );
}
