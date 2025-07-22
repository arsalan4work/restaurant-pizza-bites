
import Category from "@/components/Category";
import Chatbot from "@/components/Chatbot";
import FaqSection from "@/components/FaqSection";
import HeroSection from "@/components/HeroSection";
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <Category/>
      <ReviewsSection />
      <FaqSection />

      <Chatbot />
      
    </div>
  );
}
