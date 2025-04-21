import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="fixed inset-0 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        <p className="text-cyan-400 font-medium">Loading your data...</p>
      </div>
    </div>
  );
} 