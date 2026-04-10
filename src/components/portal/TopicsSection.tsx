import { Link } from "react-router-dom";
import { topics } from "@/data/portalData";
import { Shield, Database, Layers, FileText, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Database,
  Layers,
};

const topicIconColor = "#005A9C";
const topicAccentYellow = "#FFCC00";

const TopicsSection = () => (
  <section
    className="border-b border-border bg-background py-10 md:py-14"
    aria-labelledby="topics-heading"
  >
    <div className="container mx-auto max-w-6xl px-4">
      <div className="text-center">
        <h2
          id="topics-heading"
          className="font-sans text-2xl font-bold tracking-tight text-[#141414] md:text-[1.75rem]"
        >
          Browse by topic
        </h2>
        <div
          className="mx-auto mt-3 h-1.5 w-14 rounded-[1px] md:w-16"
          style={{ backgroundColor: topicAccentYellow }}
          aria-hidden
        />
      </div>

      <ul className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const Icon = iconMap[topic.icon] ?? FileText;
          return (
            <li key={topic.id}>
              <Link
                to={topic.href}
                className="group flex min-h-[104px] w-full items-center justify-between gap-4 rounded-sm bg-[#F2F2F2] px-5 py-4 shadow-none outline-none ring-offset-2 transition-colors hover:bg-[#E8E8E8] focus-visible:ring-2 focus-visible:ring-[#005A9C] sm:min-h-[118px] md:px-6"
              >
                <span className="min-w-0 flex-1 font-sans text-base font-medium leading-snug text-[#333333] group-hover:underline md:text-[1.05rem]">
                  {topic.label}
                  <ArrowRight
                    className="ml-1.5 inline-block h-4 w-4 shrink-0 align-middle text-[#333333] opacity-80"
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
                <Icon
                  className="h-[3.25rem] w-[3.25rem] shrink-0 md:h-14 md:w-14"
                  style={{ color: topicIconColor }}
                  strokeWidth={1.35}
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default TopicsSection;
