import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClear: () => void;
}

const EmptyState = ({ onClear }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <SearchX className="h-12 w-12 text-muted-foreground/50" />
    <h3 className="mt-4 text-lg font-semibold text-foreground">No results found</h3>
    <p className="mt-1 text-sm text-muted-foreground">
      Try adjusting your search terms or clearing some filters.
    </p>
    <Button variant="outline" className="mt-4" onClick={onClear}>
      Clear all filters
    </Button>
  </div>
);

export default EmptyState;
