export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-[3px] border-border-default border-t-accent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 bg-accent/20 rounded-full animate-pulse-warm" />
        </div>
      </div>
      <p className="text-sm text-text-muted font-medium">Loading articles...</p>
    </div>
  );
}
