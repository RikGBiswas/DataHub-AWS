import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import UtilityBanner from "@/components/portal/UtilityBanner";
import SiteHeader from "@/components/portal/SiteHeader";
import PortalFooter from "@/components/portal/PortalFooter";
import ResultCard from "@/components/catalog/ResultCard";
import EmptyState from "@/components/catalog/EmptyState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  mockCatalogItems,
  sortOptions,
  catalogItemMatchesQuery,
  type SortOption,
} from "@/data/catalogData";

const ITEMS_PER_PAGE = 8;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const qFromUrl = searchParams.get("q") ?? "";
  const [draft, setDraft] = useState(qFromUrl);
  const [sort, setSort] = useState<SortOption>("most-relevant");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setDraft(qFromUrl);
  }, [qFromUrl]);

  useEffect(() => {
    setPage(1);
  }, [qFromUrl, sort]);

  const runSearch = () => {
    const t = draft.trim();
    if (t) setSearchParams({ q: t });
    else setSearchParams({});
    setPage(1);
  };

  const filtered = useMemo(() => {
    let items = mockCatalogItems.filter((i) => catalogItemMatchesQuery(i, qFromUrl));
    items = [...items].sort((a, b) => {
      if (sort === "alphabetical") return a.title.localeCompare(b.title);
      if (sort === "recently-updated")
        return new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
      return 0;
    });
    return items;
  }, [qFromUrl, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const start = filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(page * ITEMS_PER_PAGE, filtered.length);

  const clearSearch = () => {
    setSearchParams({});
    setDraft("");
    setPage(1);
  };

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
                  <BreadcrumbPage>Search</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">Search catalog</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {qFromUrl.trim()
                ? `Results matching “${qFromUrl.trim()}” across all topics.`
                : "Browse every asset in the mock catalog, or enter a term to filter by title, description, tags, type, owner, or topic."}
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && runSearch()}
                  placeholder="Search datasets, reports, dashboards…"
                  className="h-11 pl-9 pr-9"
                  aria-label="Search catalog"
                />
                {draft && (
                  <button
                    type="button"
                    onClick={() => setDraft("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search field"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button type="button" onClick={runSearch} className="h-11 shrink-0 bg-accent text-accent-foreground">
                Search
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {filtered.length === 0
                ? "No results"
                : `Showing ${start}–${end} of ${filtered.length} result${filtered.length === 1 ? "" : "s"}`}
            </p>
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 space-y-4">
            {paginated.length === 0 ? (
              <EmptyState onClear={clearSearch} />
            ) : (
              paginated.map((item) => <ResultCard key={item.id} item={item} showTopicLink />)
            )}
          </div>

          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === page ? "default" : "outline"}
                  size="sm"
                  className="w-9"
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </nav>
          )}
        </section>
      </main>

      <PortalFooter />
    </div>
  );
};

export default SearchPage;
