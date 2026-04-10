import PortalBranding from "@/components/portal/PortalBranding";

/**
 * Compact branding for inner pages only. Same `bg-hero` as the home hero — no divider, so it isn’t a
 * separate “logo bar”; content below provides the natural break.
 */
const SiteHeader = () => (
  <header className="bg-hero text-hero-foreground">
    <div className="container mx-auto px-4 py-3 md:py-3.5">
      <PortalBranding />
    </div>
  </header>
);

export default SiteHeader;
