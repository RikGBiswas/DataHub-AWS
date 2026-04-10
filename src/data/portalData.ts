export const siteName = "CoAction Data Hub Portal";
/** Served from /public */
export const siteLogoSrc = "/CoActionLogo.png";

/** Featured & sub-hub imagery (served from /public) */
export const dataGovernanceDashboardImage = "/data-governance-dashboard.png";
const enterpriseCatalogImage = "/featured-enterprise-catalog.jpg";
const semanticLayerImage = "/featured-semantic-layer.jpg";
const analyticsImage = "/featured-analytics.jpg";

export interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface Topic {
  id: string;
  label: string;
  href: string;
  icon: string;
}

/** Browse-by-topic still uses /topics/data-catalog; featured catalog card uses this URL only. */
const DATA_GOVERNANCE_DASHBOARD_URL =
  "http://toolbox-nonprod-app.prosight.net:5005/dashboard";
const FEATURED_DATA_CATALOG_URL =
  "https://dzd-ckt2p84yb0wp2f.sagemaker.us-east-1.on.aws/projects/48ncfgc2slszzb/overview";
const ANALYTICS_POWER_BI_URL =
  "https://app.powerbi.com/Redirect?action=OpenApp&appId=86023ef5-d1cf-4122-9890-68d555bf6486&ctid=552e929e-abd9-4b16-81f3-c3eb21dc6b7c&experience=power-bi";

export const featuredItems: FeaturedItem[] = [
  {
    id: "data-governance-dashboard",
    title: "Data Governance Dashboard",
    description:
      "Monitor certification, lineage, quality scores, and KPIs across your data estate — the same view your stewards use every day.",
    image: dataGovernanceDashboardImage,
    href: DATA_GOVERNANCE_DASHBOARD_URL,
  },
  {
    id: "enterprise-data-catalog",
    title: "Enterprise Data Catalog",
    description:
      "Browse, search, and request access to certified datasets, APIs, reports, and data products with full context and ownership.",
    image: enterpriseCatalogImage,
    href: FEATURED_DATA_CATALOG_URL,
  },
  {
    id: "enterprise-semantic-layer",
    title: "Enterprise Semantic Layer",
    description:
      "Shared metrics, business terms, and logical models so everyone reports on the same definitions across tools and teams.",
    image: semanticLayerImage,
    href: "/topics/semantic-layer",
  },
  {
    id: "analytics",
    title: "Analytics",
    description:
      "Self-service reporting, curated dashboards, and advanced analytics built on governed data — from KPIs to exploratory insights.",
    image: analyticsImage,
    href: ANALYTICS_POWER_BI_URL,
  },
];

export const topics: Topic[] = [
  {
    id: "data-governance",
    label: "Data Governance",
    href: "/topics/data-governance",
    icon: "Shield",
  },
  {
    id: "data-catalog",
    label: "Data Catalog",
    href: "/topics/data-catalog",
    icon: "Database",
  },
  {
    id: "semantic-layer",
    label: "Enterprise Semantic Layer",
    href: "/topics/semantic-layer",
    icon: "Layers",
  },
];

export const subHub = {
  title: "Data Governance Dashboard",
  description:
    "Your centralized command center for certification, lineage, quality monitoring, and governance scoring. Track data health across every domain and align with enterprise standards.",
  image: dataGovernanceDashboardImage,
  href: DATA_GOVERNANCE_DASHBOARD_URL,
  cta: "Explore Data Governance Dashboard",
};
