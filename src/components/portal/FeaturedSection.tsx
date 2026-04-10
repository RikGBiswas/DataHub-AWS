import { featuredItems } from "@/data/portalData";
import FeaturedCard from "./FeaturedCard";

const FeaturedSection = () => (
  <section className="bg-background py-14">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">Featured Resources</h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {featuredItems.map((item) => (
          <FeaturedCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedSection;
