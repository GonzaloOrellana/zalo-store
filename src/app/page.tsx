import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/ui/ProductGrid";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";
import VideoEditsSection from "@/components/home/VideoEditsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Hero />
      <ProductGrid />
      <VideoEditsSection />
      <Testimonials />
      <Contact />
    </main>
  );
}
