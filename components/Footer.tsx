import { MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 text-center text-stone-500 text-sm bg-stone-100 border-t border-stone-200">
      <p className="flex items-center justify-center gap-2 px-6">
        Designed &amp; Built by Supratik Gujulvakarthicbabu
        <span className="w-1 h-1 bg-stone-300 rounded-full mx-2" />
        <MapPin size={14} className="inline" />
        Raleigh, NC
      </p>
    </footer>
  );
}
