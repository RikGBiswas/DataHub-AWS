import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PortalBranding from "@/components/portal/PortalBranding";

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      console.log("Search:", query);
    }
  };

  return (
    <section className="bg-hero text-hero-foreground" aria-labelledby="hero-heading">
      <div className="container mx-auto px-4 pb-10 pt-6 md:pb-12 md:pt-8">
        <PortalBranding className="mb-8 md:mb-10" />

        <h1
          id="hero-heading"
          className="max-w-3xl font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.75rem]"
        >
          Find trusted enterprise data
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
          Discover datasets, reports, dashboards, and analytical tools — all in one place. Search, explore,
          and put data to work.
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl overflow-hidden rounded-lg shadow-lg shadow-black/20">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search datasets, reports, dashboards…"
            className="h-12 flex-1 rounded-none border-0 bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
          />
          <Button
            type="button"
            onClick={handleSearch}
            className="h-12 rounded-none bg-accent px-5 text-accent-foreground hover:opacity-90"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
