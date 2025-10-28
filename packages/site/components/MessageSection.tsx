export function MessageSection({ message }: { message: string }) {
  if (!message) return null;
  
  return (
    <div className="col-span-full mx-4 md:mx-20 glass-card rounded-2xl p-6 text-white overflow-auto">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <span className="text-cyan-400 font-semibold text-lg">Status</span>
      </div>
      <div className="text-gray-200 text-lg leading-relaxed">
        {message}
      </div>
    </div>
  );
}
