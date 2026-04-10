import { siteName } from "@/data/portalData";

const PortalFooter = () => (
  <footer className="bg-footer text-footer-foreground">
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <p className="font-semibold">{siteName}</p>
          <p className="mt-1 text-xs opacity-70">
            © {new Date().getFullYear()} CoAction. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-6 text-sm">
          <a href="/privacy" onClick={(e) => e.preventDefault()} className="hover:underline">Privacy</a>
          <a href="/terms" onClick={(e) => e.preventDefault()} className="hover:underline">Terms</a>
          <a href="/accessibility" onClick={(e) => e.preventDefault()} className="hover:underline">Accessibility</a>
        </nav>
      </div>
    </div>
  </footer>
);

export default PortalFooter;
