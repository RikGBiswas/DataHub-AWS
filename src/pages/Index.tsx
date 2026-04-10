import UtilityBanner from "@/components/portal/UtilityBanner";
import HeroSection from "@/components/portal/HeroSection";
import FeaturedSection from "@/components/portal/FeaturedSection";
import TopicsSection from "@/components/portal/TopicsSection";
import SubHubSection from "@/components/portal/SubHubSection";
import FeedbackSection from "@/components/portal/FeedbackSection";
import PortalFooter from "@/components/portal/PortalFooter";

const Index = () => (
  <div className="flex min-h-screen flex-col">
    <UtilityBanner />
    <HeroSection />
    <main className="flex-1">
      <FeaturedSection />
      <TopicsSection />
      <SubHubSection />
      <FeedbackSection />
    </main>
    <PortalFooter />
  </div>
);

export default Index;
