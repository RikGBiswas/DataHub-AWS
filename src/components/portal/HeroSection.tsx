import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PortalBranding from "@/components/portal/PortalBranding";
import {
  featuredItems,
  filterFeaturedItemsByQuery,
  isExternalFeaturedHref,
} from "@/data/portalData";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => filterFeaturedItemsByQuery(featuredItems, query), [query]);

  useEffect(() => {
    setHighlight(0);
  }, [query, open]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const goToItem = (href: string) => {
    if (isExternalFeaturedHref(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      navigate(href);
    }
    setOpen(false);
    setQuery("");
  };

  const handleSearchClick = () => {
    setOpen(true);
    if (filtered.length === 1) goToItem(filtered[0].href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, Math.max(0, filtered.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && filtered.length > 0) {
      e.preventDefault();
      const item = filtered[highlight] ?? filtered[0];
      if (item) goToItem(item.href);
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

        <div ref={wrapRef} className="relative mx-auto mt-8 max-w-2xl">
          <div className="flex overflow-hidden rounded-lg shadow-lg shadow-black/20">
            <Input
              role="combobox"
              aria-expanded={open}
              aria-controls="featured-services-listbox"
              aria-autocomplete="list"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={onKeyDown}
              placeholder="Search featured services…"
              className="h-12 flex-1 rounded-none border-0 bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
            />
            <Button
              type="button"
              onClick={handleSearchClick}
              className="h-12 rounded-none bg-accent px-5 text-accent-foreground hover:opacity-90"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>

          {open && (
            <div
              id="featured-services-listbox"
              role="listbox"
              className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[min(22rem,70vh)] overflow-auto rounded-md border border-border bg-card py-1 shadow-lg"
            >
              {filtered.length === 0 ? (
                <p className="px-3 py-4 text-center text-sm text-muted-foreground">
                  No featured service matches that text.
                </p>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={i === highlight}
                    className={`flex w-full gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted/80 ${
                      i === highlight ? "bg-muted/60" : ""
                    }`}
                    onMouseEnter={() => setHighlight(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => goToItem(item.href)}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="h-14 w-20 shrink-0 rounded object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-foreground">{item.title}</span>
                      <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
