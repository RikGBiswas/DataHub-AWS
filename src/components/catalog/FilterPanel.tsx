import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { FilterOption } from "@/data/catalogData";

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
}

const FilterGroup = ({ title, options, selected, onToggle }: FilterGroupProps) => (
  <div className="space-y-3">
    <h4 className="text-sm font-semibold text-foreground">{title}</h4>
    <div className="space-y-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex cursor-pointer items-center gap-2 text-sm"
        >
          <Checkbox
            checked={selected.includes(opt.value)}
            onCheckedChange={() => onToggle(opt.value)}
          />
          <span className="flex-1 text-foreground">{opt.label}</span>
          <span className="text-xs text-muted-foreground">({opt.count})</span>
        </label>
      ))}
    </div>
  </div>
);

export interface Filters {
  subtopic: string[];
  dataType: string[];
  owner: string[];
  format: string[];
}

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  subtopicOptions: FilterOption[];
  dataTypeOptions: FilterOption[];
  ownerOptions: FilterOption[];
  formatOptions: FilterOption[];
}

const FilterPanel = ({
  filters,
  onFilterChange,
  subtopicOptions: subOpts,
  dataTypeOptions: dtOpts,
  ownerOptions: ownOpts,
  formatOptions: fmtOpts,
}: FilterPanelProps) => {
  const toggle = (key: keyof Filters, value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [key]: updated });
  };

  const hasFilters = Object.values(filters).some((arr) => arr.length > 0);

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Filters</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-secondary hover:text-secondary/80"
            onClick={() =>
              onFilterChange({ subtopic: [], dataType: [], owner: [], format: [] })
            }
          >
            Clear all
          </Button>
        )}
      </div>

      {subOpts.length > 0 && (
        <FilterGroup
          title="Subtopic"
          options={subOpts}
          selected={filters.subtopic}
          onToggle={(v) => toggle("subtopic", v)}
        />
      )}

      <FilterGroup
        title="Data Type"
        options={dtOpts}
        selected={filters.dataType}
        onToggle={(v) => toggle("dataType", v)}
      />

      <FilterGroup
        title="Owner / Team"
        options={ownOpts}
        selected={filters.owner}
        onToggle={(v) => toggle("owner", v)}
      />

      <FilterGroup
        title="Format"
        options={fmtOpts}
        selected={filters.format}
        onToggle={(v) => toggle("format", v)}
      />
    </aside>
  );
};

export default FilterPanel;
