import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { categoryMeta, type CatalogItem } from "@/data/catalogData";
import { format } from "date-fns";

const typeColorMap: Record<string, string> = {
  Dataset: "bg-secondary text-secondary-foreground",
  Report: "bg-primary text-primary-foreground",
  Dashboard: "bg-accent text-accent-foreground",
  "Data Product": "bg-secondary/80 text-secondary-foreground",
  "Data Catalog": "bg-primary/80 text-primary-foreground",
  API: "bg-muted text-foreground",
};

interface ResultCardProps {
  item: CatalogItem;
  /** When set, show a link to the asset’s browse-by-topic page. */
  showTopicLink?: boolean;
}

const ResultCard = ({ item, showTopicLink }: ResultCardProps) => (
  <article className="group rounded-lg border border-border bg-card p-5 transition-all hover:border-secondary/50 hover:shadow-md">
    <div className="flex flex-wrap items-start justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${typeColorMap[item.type] ?? "bg-muted text-foreground"}`}
        >
          {item.type}
        </span>
        {showTopicLink && (
          <Link
            to={`/topics/${item.category}`}
            className="text-xs font-medium text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {categoryMeta[item.category]?.title ?? item.category}
          </Link>
        )}
        <span className="text-xs text-muted-foreground">
          Updated {format(new Date(item.updatedDate), "MMM d, yyyy")}
        </span>
      </div>
      <span className="text-xs text-muted-foreground">{item.owner}</span>
    </div>

    <a
      href={item.targetUrl}
      onClick={(e) => e.preventDefault()}
      className="mt-2 block text-lg font-semibold text-foreground transition-colors group-hover:text-secondary"
    >
      {item.title}
    </a>

    <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
      {item.description}
    </p>

    <div className="mt-3 flex flex-wrap items-center gap-2">
      {item.formats.map((f) => (
        <Badge key={f} variant="outline" className="text-xs font-normal">
          {f}
        </Badge>
      ))}
      {item.tags.slice(0, 3).map((t) => (
        <Badge key={t} variant="secondary" className="text-xs font-normal">
          {t}
        </Badge>
      ))}
    </div>
  </article>
);

export default ResultCard;
