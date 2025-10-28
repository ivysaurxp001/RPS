export function GameButton({
  onClick,
  disabled = false,
  variant = "primary",
  fullWidth = false,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "success" | "join" | "waiting";
  fullWidth?: boolean;
  children: React.ReactNode;
}) {
  const baseClasses =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl";
  const widthClass = fullWidth ? "w-full" : "flex-1";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/25",
    secondary: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-500 hover:to-gray-600 shadow-gray-500/25",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 shadow-green-500/25",
    join: "bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-400 hover:to-pink-500 shadow-purple-500/25",
    waiting:
      "bg-gray-100/20 border border-gray-300/30 text-gray-300 text-center cursor-default backdrop-blur-sm",
  };

  if (variant === "waiting") {
    return (
      <div
        className={`${baseClasses} ${widthClass} ${variantClasses[variant]}`}
      >
        {children}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${widthClass} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}

export function ButtonContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-4 space-y-3">
      <div className="flex gap-3 flex-wrap">{children}</div>
    </div>
  );
}
