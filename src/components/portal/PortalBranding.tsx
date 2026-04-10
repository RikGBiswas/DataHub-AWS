import { Link } from "react-router-dom";
import { siteLogoSrc, siteName } from "@/data/portalData";
import { cn } from "@/lib/utils";

interface PortalBrandingProps {
  className?: string;
}

/** Logo + site name — use inside a parent that already sets `bg-hero` (no extra header bar). */
const PortalBranding = ({ className }: PortalBrandingProps) => (
  <div className={cn(className)}>
    <Link
      to="/"
      aria-label={`${siteName}, home`}
      className="inline-flex max-w-full items-center gap-3 text-white no-underline outline-none ring-offset-2 ring-offset-[hsl(var(--hero-bg))] focus-visible:ring-2 focus-visible:ring-white/80 md:gap-3.5"
    >
      <span className="flex h-9 shrink-0 items-center rounded-sm bg-black px-2.5 md:h-10 md:px-3">
        <img
          src={siteLogoSrc}
          alt=""
          width={160}
          height={40}
          className="h-5 w-auto max-h-full object-contain object-left md:h-6"
          decoding="async"
        />
      </span>
      <span className="min-w-0 font-sans text-base font-bold leading-tight tracking-tight md:text-lg">
        {siteName}
      </span>
    </Link>
  </div>
);

export default PortalBranding;
