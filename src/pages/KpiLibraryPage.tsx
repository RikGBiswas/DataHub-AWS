import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Search } from "lucide-react";
import UtilityBanner from "@/components/portal/UtilityBanner";
import SiteHeader from "@/components/portal/SiteHeader";
import PortalFooter from "@/components/portal/PortalFooter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { kpiDomains } from "@/data/kpiLibraryData";

const ALL_DOMAINS_ID = "all-domains";

const getKpiDescription = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("closing ratio")) {
    return "Tracks claim closure effectiveness by comparing inflow versus closed claims.";
  }
  if (lowerName.includes("reopen rate")) {
    return "Measures the proportion of claims that return to open status after closure.";
  }
  if (lowerName.includes("cwoip claim rate")) {
    return "Shows the share of CWOIP against the total CWOIP and CWP claim population.";
  }
  if (lowerName.includes("count")) {
    return "Represents the total volume for this claim state in the selected period view.";
  }
  if (lowerName.includes("percentage")) {
    return "Compares current performance to prior development as a percentage change.";
  }
  if (lowerName.includes("rate")) {
    return "Indicates the rate-based performance for this KPI definition.";
  }
  if (lowerName.includes("total elements")) {
    return "Captures the total enterprise elements used for governance KPI tracking.";
  }
  if (lowerName.includes("quality")) {
    return "Reflects quality and governance outcomes across monitored data elements.";
  }
  return "Reference definition used to standardize KPI interpretation across teams.";
};

const getKpiUnit = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("count") || lowerName.includes("total elements")) return "Count";
  if (lowerName.includes("ratio") || lowerName.includes("rate") || lowerName.includes("percentage")) {
    return "%";
  }
  return "N/A";
};

const KpiLibraryPage = () => {
  const [selectedDomainId, setSelectedDomainId] = useState(ALL_DOMAINS_ID);
  const [searchTerm, setSearchTerm] = useState("");

  const domains = useMemo(
    () => [{ id: ALL_DOMAINS_ID, label: "All Domains" }, ...kpiDomains.map((d) => ({ id: d.id, label: d.label }))],
    [],
  );

  const kpiCards = useMemo(() => {
    const flattened = kpiDomains.flatMap((domain) =>
      domain.kpis.map((kpi) => ({
        id: `${domain.id}-${kpi.name}`,
        name: kpi.name,
        formula: kpi.formula,
        domainId: domain.id,
        domainLabel: domain.label,
        description: getKpiDescription(kpi.name),
        unit: getKpiUnit(kpi.name),
      })),
    );

    return flattened.filter((kpi) => {
      const matchesDomain =
        selectedDomainId === ALL_DOMAINS_ID || kpi.domainId === selectedDomainId;
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        kpi.name.toLowerCase().includes(q) ||
        kpi.formula.toLowerCase().includes(q) ||
        kpi.domainLabel.toLowerCase().includes(q);
      return matchesDomain && matchesSearch;
    });
  }, [selectedDomainId, searchTerm]);

  return (
    <div className="flex min-h-screen flex-col">
      <UtilityBanner />
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>KPI Library</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">KPI Library</h1>
            <p className="mt-2 max-w-3xl text-base text-muted-foreground">
              View KPI definitions and formulas by domain. Select a domain to see the available
              KPI list and calculation details.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="rounded-lg border border-border bg-card p-5 md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {domains.map((domain) => (
                  <Button
                    key={domain.id}
                    type="button"
                    variant={selectedDomainId === domain.id ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setSelectedDomainId(domain.id)}
                  >
                    {domain.label}
                  </Button>
                ))}
              </div>
              <div className="relative w-full lg:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search KPIs..."
                  className="pl-9"
                />
              </div>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">Showing {kpiCards.length} KPIs</p>

            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {kpiCards.map((kpi) => (
                <Card key={kpi.id} className="border-border/80 shadow-sm">
                  <CardContent className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-cyan-600" />
                        <h3 className="text-lg font-semibold text-foreground">{kpi.name}</h3>
                      </div>
                      <Badge variant="secondary">{kpi.domainLabel}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">{kpi.description}</p>

                    <div className="rounded-md border border-border bg-muted/30 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Formula
                      </p>
                      <p className="mt-2 text-sm text-foreground">{kpi.formula}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{kpi.domainLabel}</span>
                      <span>Unit: {kpi.unit}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {kpiCards.length === 0 && (
              <div className="mt-6 rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No KPIs found for the selected filters.
              </div>
            )}
          </div>
        </section>
      </main>

      <PortalFooter />
    </div>
  );
};

export default KpiLibraryPage;
