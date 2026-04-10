export interface CatalogItem {
  id: string;
  type: "Dataset" | "Report" | "Dashboard" | "Data Product" | "Data Catalog" | "API";
  title: string;
  description: string;
  owner: string;
  updatedDate: string;
  formats: string[];
  category: string;
  subtopic: string;
  tags: string[];
  targetUrl: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export const categoryMeta: Record<string, { title: string; description: string }> = {
  "data-governance": {
    title: "Data Governance",
    description:
      "Policies, stewardship, standards, and controls that define how enterprise data is managed, protected, and used.",
  },
  "data-catalog": {
    title: "Data Catalog",
    description:
      "Discover certified datasets, reports, APIs, and data products with ownership, lineage, and access information. Search and filter by inventory, integrations, lineage impact, and entitlements — then request access or open governed assets in context.",
  },
  "semantic-layer": {
    title: "Enterprise Semantic Layer",
    description:
      "Shared business definitions, metrics, and logical models that align analytics and reporting across the organization.",
  },
  governance: {
    title: "Governance",
    description: "Policies, standards, and frameworks that guide how data is managed, secured, and used across the enterprise.",
  },
  claims: {
    title: "Claims",
    description: "Datasets, reports, and dashboards related to claims intake, adjudication, and settlement processes.",
  },
  policy: {
    title: "Policy",
    description: "Explore datasets, reports, and analytical tools covering policy administration, lifecycle, and performance.",
  },
  underwriting: {
    title: "Underwriting",
    description: "Risk assessment models, pricing datasets, and underwriting performance dashboards.",
  },
  analytics: {
    title: "Analytics",
    description: "Cross-functional analytical assets including models, visualizations, and self-service reporting tools.",
  },
  "data-quality": {
    title: "Data Quality",
    description: "Monitoring, profiling, and remediation assets that track and improve data accuracy and completeness.",
  },
  finance: {
    title: "Finance",
    description: "Financial reporting, actuarial datasets, and budget performance dashboards for the enterprise.",
  },
  operations: {
    title: "Operations",
    description: "Operational metrics, workflow data, and process efficiency dashboards across business units.",
  },
  regulatory: {
    title: "Regulatory",
    description: "Compliance datasets, regulatory filing reports, and audit-readiness dashboards.",
  },
};

export const subtopicOptions: Record<string, FilterOption[]> = {
  policy: [
    { value: "administration", label: "Administration", count: 4 },
    { value: "lifecycle", label: "Lifecycle", count: 3 },
    { value: "pricing", label: "Pricing", count: 2 },
    { value: "compliance", label: "Compliance", count: 3 },
  ],
  governance: [
    { value: "standards", label: "Standards", count: 3 },
    { value: "stewardship", label: "Stewardship", count: 2 },
    { value: "metadata", label: "Metadata", count: 4 },
  ],
  "data-catalog": [
    { value: "metadata", label: "Inventory & metadata", count: 6 },
    { value: "integrations", label: "APIs & integrations", count: 1 },
    { value: "lineage", label: "Lineage & impact", count: 3 },
    { value: "access", label: "Access & entitlements", count: 2 },
  ],
};

export const dataTypeOptions: FilterOption[] = [
  { value: "Dataset", label: "Dataset", count: 5 },
  { value: "Report", label: "Report", count: 3 },
  { value: "Dashboard", label: "Dashboard", count: 2 },
  { value: "Data Product", label: "Data Product", count: 1 },
  { value: "API", label: "API", count: 1 },
];

export const ownerOptions: FilterOption[] = [
  { value: "data-office", label: "Enterprise Data Office", count: 4 },
  { value: "policy-ops", label: "Policy Operations", count: 3 },
  { value: "analytics-coe", label: "Analytics CoE", count: 2 },
  { value: "it-services", label: "IT Services", count: 2 },
  { value: "compliance", label: "Compliance & Risk", count: 1 },
];

export const formatOptions: FilterOption[] = [
  { value: "csv", label: "CSV", count: 6 },
  { value: "json", label: "JSON", count: 4 },
  { value: "api", label: "API", count: 3 },
  { value: "pdf", label: "PDF", count: 3 },
  { value: "parquet", label: "Parquet", count: 2 },
];

export const mockCatalogItems: CatalogItem[] = [
  {
    id: "pol-001",
    type: "Dataset",
    title: "Policy Master Registry",
    description: "Comprehensive registry of all active and archived policies across business lines, including key metadata, effective dates, and status indicators.",
    owner: "Enterprise Data Office",
    updatedDate: "2026-03-28",
    formats: ["CSV", "JSON", "API"],
    category: "policy",
    subtopic: "administration",
    tags: ["certified", "governed", "high-use"],
    targetUrl: "/catalog/pol-001",
  },
  {
    id: "pol-002",
    type: "Report",
    title: "Quarterly Policy Performance Summary",
    description: "Standardized performance report covering policy retention rates, lapse ratios, and renewal metrics by region and product line.",
    owner: "Policy Operations",
    updatedDate: "2026-03-15",
    formats: ["PDF", "CSV"],
    category: "policy",
    subtopic: "lifecycle",
    tags: ["quarterly", "executive"],
    targetUrl: "/catalog/pol-002",
  },
  {
    id: "pol-003",
    type: "Dashboard",
    title: "Policy Lifecycle Tracker",
    description: "Interactive dashboard visualizing policy lifecycle stages from issuance through renewal or cancellation with drill-down by product.",
    owner: "Analytics CoE",
    updatedDate: "2026-04-01",
    formats: ["API"],
    category: "policy",
    subtopic: "lifecycle",
    tags: ["interactive", "real-time"],
    targetUrl: "/catalog/pol-003",
  },
  {
    id: "pol-004",
    type: "Dataset",
    title: "Policy Pricing Reference Tables",
    description: "Reference dataset containing base rate tables, rating factors, and discount schedules used in policy pricing workflows.",
    owner: "Policy Operations",
    updatedDate: "2026-02-20",
    formats: ["CSV", "Parquet"],
    category: "policy",
    subtopic: "pricing",
    tags: ["reference", "certified"],
    targetUrl: "/catalog/pol-004",
  },
  {
    id: "pol-005",
    type: "Data Product",
    title: "Policy Risk Score API",
    description: "Composite risk scoring service that evaluates policy-level risk based on claims history, exposure, and underwriting factors.",
    owner: "Analytics CoE",
    updatedDate: "2026-03-10",
    formats: ["API", "JSON"],
    category: "policy",
    subtopic: "pricing",
    tags: ["api", "ml-powered"],
    targetUrl: "/catalog/pol-005",
  },
  {
    id: "pol-006",
    type: "Report",
    title: "Policy Compliance Audit Report",
    description: "Annual compliance report summarizing policy adherence to regulatory requirements and internal governance standards.",
    owner: "Compliance & Risk",
    updatedDate: "2026-01-30",
    formats: ["PDF"],
    category: "policy",
    subtopic: "compliance",
    tags: ["annual", "regulatory"],
    targetUrl: "/catalog/pol-006",
  },
  {
    id: "pol-007",
    type: "Dataset",
    title: "Policy Endorsement History",
    description: "Transactional dataset capturing all policy endorsements, amendments, and riders with effective dates and premium impact.",
    owner: "Enterprise Data Office",
    updatedDate: "2026-03-22",
    formats: ["CSV", "JSON", "Parquet"],
    category: "policy",
    subtopic: "administration",
    tags: ["transactional", "high-volume"],
    targetUrl: "/catalog/pol-007",
  },
  {
    id: "pol-008",
    type: "Dashboard",
    title: "Policy Distribution Channel Analytics",
    description: "Dashboard showing policy acquisition volumes, conversion rates, and channel effectiveness across direct, broker, and digital channels.",
    owner: "Analytics CoE",
    updatedDate: "2026-04-05",
    formats: ["API"],
    category: "policy",
    subtopic: "lifecycle",
    tags: ["interactive", "channel"],
    targetUrl: "/catalog/pol-008",
  },
  {
    id: "pol-009",
    type: "Dataset",
    title: "Policy Document Metadata Index",
    description: "Metadata index linking policy numbers to associated document artifacts including applications, declarations pages, and correspondence.",
    owner: "IT Services",
    updatedDate: "2026-02-14",
    formats: ["JSON", "CSV"],
    category: "policy",
    subtopic: "administration",
    tags: ["metadata", "document-management"],
    targetUrl: "/catalog/pol-009",
  },
  {
    id: "pol-010",
    type: "Report",
    title: "Policy Cancellation & Lapse Analysis",
    description: "Detailed analysis report on policy cancellation drivers, voluntary lapse patterns, and retention intervention effectiveness.",
    owner: "Policy Operations",
    updatedDate: "2026-03-05",
    formats: ["PDF", "CSV"],
    category: "policy",
    subtopic: "lifecycle",
    tags: ["analysis", "retention"],
    targetUrl: "/catalog/pol-010",
  },
  {
    id: "pol-011",
    type: "API",
    title: "Policy Validation Service",
    description: "Real-time API service for validating policy data completeness, format consistency, and business rule compliance before submission.",
    owner: "IT Services",
    updatedDate: "2026-04-02",
    formats: ["API"],
    category: "policy",
    subtopic: "compliance",
    tags: ["api", "validation", "real-time"],
    targetUrl: "/catalog/pol-011",
  },
  {
    id: "pol-012",
    type: "Dataset",
    title: "Policy Holder Demographics",
    description: "Aggregated demographic dataset of policy holders by region, age group, and product type for analytical and reporting purposes.",
    owner: "Enterprise Data Office",
    updatedDate: "2026-03-18",
    formats: ["CSV", "Parquet", "JSON"],
    category: "policy",
    subtopic: "administration",
    tags: ["aggregated", "demographics", "certified"],
    targetUrl: "/catalog/pol-012",
  },
  {
    id: "gov-001",
    type: "Report",
    title: "Data Classification & Retention Standard",
    description: "Enterprise standard for data classification tiers, retention schedules, and handling rules.",
    owner: "Enterprise Data Office",
    updatedDate: "2026-03-01",
    formats: ["PDF"],
    category: "data-governance",
    subtopic: "standards",
    tags: ["policy", "compliance"],
    targetUrl: "/catalog/gov-001",
  },
  {
    id: "gov-002",
    type: "Dashboard",
    title: "Stewardship Coverage Dashboard",
    description: "Coverage of data stewards and domain ownership across critical enterprise datasets.",
    owner: "Enterprise Data Office",
    updatedDate: "2026-04-01",
    formats: ["API"],
    category: "data-governance",
    subtopic: "stewardship",
    tags: ["governance", "metrics"],
    targetUrl: "/catalog/gov-002",
  },
  {
    id: "cat-001",
    type: "Data Catalog",
    title: "Curated Dataset Inventory",
    description: "Searchable inventory of certified datasets with metadata, owners, and access paths.",
    owner: "Enterprise Data Office",
    updatedDate: "2026-03-20",
    formats: ["API", "JSON"],
    category: "data-catalog",
    subtopic: "metadata",
    tags: ["catalog", "certified"],
    targetUrl: "/catalog/cat-001",
  },
  {
    id: "cat-002",
    type: "Dataset",
    title: "API & Integration Registry",
    description: "Registered enterprise APIs and integration endpoints exposed through the catalog.",
    owner: "IT Services",
    updatedDate: "2026-03-12",
    formats: ["JSON", "CSV"],
    category: "data-catalog",
    subtopic: "metadata",
    tags: ["api", "integration"],
    targetUrl: "/catalog/cat-002",
  },
  {
    id: "cat-003",
    type: "Dataset",
    title: "Enterprise Subject Area Index",
    description:
      "Authoritative index of business subject areas, owning domains, and linked catalog assets for navigation and scope.",
    owner: "Enterprise Data Office",
    updatedDate: "2026-04-06",
    formats: ["CSV", "JSON"],
    category: "data-catalog",
    subtopic: "metadata",
    tags: ["certified", "navigation"],
    targetUrl: "/catalog/cat-003",
  },
  {
    id: "cat-004",
    type: "Dashboard",
    title: "Catalog Coverage by Business Domain",
    description:
      "Live view of catalog completeness: certified vs uncertified assets, stale metadata, and stewardship gaps by domain.",
    owner: "Enterprise Data Office",
    updatedDate: "2026-04-09",
    formats: ["API"],
    category: "data-catalog",
    subtopic: "metadata",
    tags: ["coverage", "stewardship"],
    targetUrl: "/catalog/cat-004",
  },
  {
    id: "cat-005",
    type: "API",
    title: "Asset Search & Discovery API",
    description:
      "Programmatic search across catalog entities with filters for certification status, PII tags, freshness, and domain.",
    owner: "IT Services",
    updatedDate: "2026-03-28",
    formats: ["API", "JSON"],
    category: "data-catalog",
    subtopic: "integrations",
    tags: ["api", "search"],
    targetUrl: "/catalog/cat-005",
  },
  {
    id: "cat-006",
    type: "Report",
    title: "Monthly New Asset Onboarding Summary",
    description:
      "Operational report of assets added, retired, or recertified in the catalog with SLA metrics for metadata completion.",
    owner: "Enterprise Data Office",
    updatedDate: "2026-04-01",
    formats: ["PDF", "CSV"],
    category: "data-catalog",
    subtopic: "metadata",
    tags: ["monthly", "operations"],
    targetUrl: "/catalog/cat-006",
  },
  {
    id: "cat-007",
    type: "Dataset",
    title: "Column-Level Tags & Classifications Export",
    description:
      "Bulk export of sensitivity labels, retention classes, and glossary term links as maintained in the catalog.",
    owner: "Compliance & Risk",
    updatedDate: "2026-03-22",
    formats: ["Parquet", "CSV"],
    category: "data-catalog",
    subtopic: "lineage",
    tags: ["pii", "classification"],
    targetUrl: "/catalog/cat-007",
  },
  {
    id: "cat-008",
    type: "Data Product",
    title: "Curated Claims Mart — Catalog Product Card",
    description:
      "Governed data product definition for the claims analytical mart: SLAs, consumers, refresh cadence, and quality rules.",
    owner: "Analytics CoE",
    updatedDate: "2026-04-07",
    formats: ["JSON", "API"],
    category: "data-catalog",
    subtopic: "metadata",
    tags: ["data-product", "claims"],
    targetUrl: "/catalog/cat-008",
  },
  {
    id: "cat-009",
    type: "Dataset",
    title: "Upstream Source System Register",
    description:
      "Mapping of logical catalog assets to operational source systems, connection types, and extraction patterns.",
    owner: "IT Services",
    updatedDate: "2026-02-18",
    formats: ["CSV", "JSON"],
    category: "data-catalog",
    subtopic: "lineage",
    tags: ["sources", "ingestion"],
    targetUrl: "/catalog/cat-009",
  },
  {
    id: "cat-010",
    type: "Report",
    title: "Impact Analysis — Deprecated Field Usage",
    description:
      "Catalog-derived report listing downstream dashboards, APIs, and datasets still referencing deprecated schema fields.",
    owner: "Enterprise Data Office",
    updatedDate: "2026-03-15",
    formats: ["PDF", "CSV"],
    category: "data-catalog",
    subtopic: "lineage",
    tags: ["impact", "deprecation"],
    targetUrl: "/catalog/cat-010",
  },
  {
    id: "cat-011",
    type: "API",
    title: "Self-Service Access Request Gateway",
    description:
      "Submit and track catalog-linked access requests with routing to data owners and policy checks against entitlements.",
    owner: "IT Services",
    updatedDate: "2026-04-04",
    formats: ["API"],
    category: "data-catalog",
    subtopic: "access",
    tags: ["access", "workflow"],
    targetUrl: "/catalog/cat-011",
  },
  {
    id: "cat-012",
    type: "Dataset",
    title: "Consumer Entitlements & Role Mappings",
    description:
      "Snapshot of which roles and groups can discover or subscribe to each catalog asset class under enterprise RBAC.",
    owner: "Enterprise Data Office",
    updatedDate: "2026-03-19",
    formats: ["CSV", "JSON"],
    category: "data-catalog",
    subtopic: "access",
    tags: ["rbac", "security"],
    targetUrl: "/catalog/cat-012",
  },
  {
    id: "sem-001",
    type: "Data Product",
    title: "Canonical Policy Metrics Model",
    description: "Shared definitions for premium, exposure, and loss metrics used in enterprise analytics.",
    owner: "Analytics CoE",
    updatedDate: "2026-03-25",
    formats: ["JSON", "API"],
    category: "semantic-layer",
    subtopic: "metrics",
    tags: ["semantic", "metrics"],
    targetUrl: "/catalog/sem-001",
  },
  {
    id: "sem-002",
    type: "Dataset",
    title: "Business Glossary & Term Mapping",
    description: "Mapped business terms to physical fields and logical entities across the semantic layer.",
    owner: "Enterprise Data Office",
    updatedDate: "2026-02-28",
    formats: ["CSV", "JSON"],
    category: "semantic-layer",
    subtopic: "metadata",
    tags: ["glossary", "lineage"],
    targetUrl: "/catalog/sem-002",
  },
  {
    id: "anl-001",
    type: "Dashboard",
    title: "Executive KPI Overview",
    description: "Curated leadership dashboard for premium, loss ratio, and growth metrics with drill-through to governed sources.",
    owner: "Analytics CoE",
    updatedDate: "2026-04-08",
    formats: ["API"],
    category: "analytics",
    subtopic: "reporting",
    tags: ["kpi", "executive"],
    targetUrl: "/catalog/anl-001",
  },
  {
    id: "anl-002",
    type: "Report",
    title: "Self-Service Analytics Dataset",
    description: "Sandbox-ready dataset for approved analysts with pre-joined dimensions aligned to the semantic layer.",
    owner: "Analytics CoE",
    updatedDate: "2026-03-30",
    formats: ["Parquet", "CSV"],
    category: "analytics",
    subtopic: "reporting",
    tags: ["self-service", "governed"],
    targetUrl: "/catalog/anl-002",
  },
];

/** Global search across title, description, tags, type, owner, category id, and topic display name. */
export function catalogItemMatchesQuery(item: CatalogItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const catTitle = (categoryMeta[item.category]?.title ?? item.category).toLowerCase();
  return (
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.tags.some((t) => t.toLowerCase().includes(q)) ||
    item.type.toLowerCase().includes(q) ||
    item.owner.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    catTitle.includes(q)
  );
}

export type SortOption = "alphabetical" | "recently-updated" | "most-relevant";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "most-relevant", label: "Most Relevant" },
  { value: "recently-updated", label: "Recently Updated" },
  { value: "alphabetical", label: "Alphabetical" },
];
