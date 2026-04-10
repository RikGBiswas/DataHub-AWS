import { Shield } from "lucide-react";

const UtilityBanner = () => (
  <div className="bg-utility text-utility-foreground">
    <div className="container mx-auto flex items-center justify-between px-4 py-1.5 text-sm">
      <div className="flex items-center gap-2">
        <Shield className="h-4 w-4" />
        <span className="font-medium">Enterprise Data Portal</span>
      </div>
      <span className="hidden text-xs opacity-80 sm:inline">
        An official enterprise data resource
      </span>
    </div>
  </div>
);

export default UtilityBanner;
