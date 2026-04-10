import { useNavigate } from "react-router-dom";
import type { FeaturedItem } from "@/data/portalData";

interface FeaturedCardProps {
  item: FeaturedItem;
}

const isExternalHref = (href: string) => /^https?:\/\//i.test(href);

const cardClassName =
  "group block w-full cursor-pointer overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm transition-shadow hover:shadow-md";

const FeaturedCard = ({ item }: FeaturedCardProps) => {
  const navigate = useNavigate();
  const external = isExternalHref(item.href);

  if (external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-secondary">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </div>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => navigate(item.href)}
      className={cardClassName}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-secondary">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
    </button>
  );
};

export default FeaturedCard;
