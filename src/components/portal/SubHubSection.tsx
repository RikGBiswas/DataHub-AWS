import { subHub } from "@/data/portalData";
import { ArrowRight } from "lucide-react";

const SubHubSection = () => (
  <section className="bg-background py-14">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">Featured Hub</h2>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Dive deeper into our flagship data governance platform.
      </p>
      <a
        href={subHub.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 flex cursor-pointer flex-col overflow-hidden rounded-lg border border-border text-inherit no-underline shadow-sm transition-shadow hover:shadow-md lg:flex-row"
      >
        <div className="aspect-video shrink-0 lg:aspect-auto lg:w-1/2">
          <img
            src={subHub.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col justify-center bg-card p-8 lg:w-1/2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-secondary md:text-2xl">
            {subHub.title}
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{subHub.description}</p>
          <span className="mt-6 inline-flex h-10 w-fit items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground group-hover:opacity-90">
            {subHub.cta}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </a>
    </div>
  </section>
);

export default SubHubSection;
