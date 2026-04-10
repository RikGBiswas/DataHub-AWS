import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import UtilityBanner from "@/components/portal/UtilityBanner";
import SiteHeader from "@/components/portal/SiteHeader";
import PortalFooter from "@/components/portal/PortalFooter";
import FilterPanel, { type Filters } from "@/components/catalog/FilterPanel";
import ResultCard from "@/components/catalog/ResultCard";
import ResultSkeleton from "@/components/catalog/ResultSkeleton";
import EmptyState from "@/components/catalog/EmptyState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  categoryMeta,
  mockCatalogItems,
  subtopicOptions,
  dataTypeOptions,
  ownerOptions,
  formatOptions,
  sortOptions,
  type SortOption,
  type CatalogItem,
} from "@/data/catalogData";

const ITEMS_PER_PAGE = 5;

const emptyFilters: Filters = { subtopic: [], dataType: [], owner: [], format: [] };

const TopicPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const meta = categoryMeta[topicId ?? ""] ?? { title: topicId ?? "Topic", description: "" };

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState<SortOption>("most-relevant");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [topicId]);

  // Reset on topic change
  useEffect(() => {
    setSearch("");
    setFilters(emptyFilters);
    setSort("most-relevant");
    setPage(1);
  }, [topicId]);

  const filtered = useMemo(() => {
    let items = mockCatalogItems.filter((i) => i.category === topicId);

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters.subtopic.length)
      items = items.filter((i) => filters.subtopic.includes(i.subtopic));
    if (filters.dataType.length)
      items = items.filter((i) => filters.dataType.includes(i.type));
    if (filters.owner.length)
      items = items.filter((i) =>
        filters.owner.some((o) => ownerOptions.find((opt) => opt.value === o)?.label === i.owner)
      );
    if (filters.format.length)
      items = items.filter((i) =>
        i.formats.some((f) => filters.format.includes(f.toLowerCase()))
      );

    // Sort
    items = [...items].sort((a, b) => {
      if (sort === "alphabetical") return a.title.localeCompare(b.title);
      if (sort === "recently-updated")
        return new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
      return 0;
    });

    return items;
  }, [search, filters, sort, topicId]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const start = filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(page * ITEMS_PER_PAGE, filtered.length);

  const clearAll = () => {
    setSearch("");
    setFilters(emptyFilters);
    setPage(1);
  };

  const subOpts = subtopicOptions[topicId ?? ""] ?? [];

  const filterPanel = (
    <FilterPanel
      filters={filters}
      onFilterChange={(f) => { setFilters(f); setPage(1); }}
      subtopicOptions={subOpts}
      dataTypeOptions={dataTypeOptions}
      ownerOptions={ownerOptions}
      formatOptions={formatOptions}
    />
  );

  const activeFilterCount = Object.values(filters).reduce((s, a) => s + a.length, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <UtilityBanner />
      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb + Title */}
        <section className="bg-card border-b border-border">
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
                  <BreadcrumbLink href="#" onClick={(e) => e.preventDefault()}>
                    All Data
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{meta.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
              {meta.title}
            </h1>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              {meta.description}
            </p>
          </div>
        </section>

        {/* Content area */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Desktop filters */}
            <div className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-4 rounded-lg border border-border bg-card p-5">
                {filterPanel}
              </div>
            </div>

            {/* Results column */}
            <div className="flex-1 min-w-0">
              {/* Search + mobile filter toggle */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder={`Search ${meta.title.toLowerCase()} assets...`}
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="pl-9"
                  />
                  {search && (
                    <button
                      onClick={() => { setSearch(""); setPage(1); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Mobile filter button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filters
                      {activeFilterCount > 0 && (
                        <Badge className="ml-1.5 h-5 w-5 rounded-full p-0 text-[10px]">
                          {activeFilterCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">{filterPanel}</div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Results summary + sort */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  {filtered.length === 0
                    ? "No results"
                    : `Showing ${start}–${end} of ${filtered.length} results for ${meta.title}`}
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

              {/* Results */}
              <div className="mt-4 space-y-4">
                {loading ? (
                  <ResultSkeleton />
                ) : paginated.length === 0 ? (
                  <EmptyState onClear={clearAll} />
                ) : (
                  paginated.map((item) => <ResultCard key={item.id} item={item} />)
                )}
              </div>

              {/* Pagination */}
              {!loading && totalPages > 1 && (
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
            </div>
          </div>
        </section>
      </main>

      <PortalFooter />
    </div>
  );
};

export default TopicPage;
