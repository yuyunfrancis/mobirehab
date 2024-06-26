import React from "react";

const Button = ({
  label,
  onClick,
  variant = "filled",
  color = "blue",
  disabled = false,
  loading = false,
  icon,
  className = "",
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium transition-all duration-300 flex items-center justify-center";
  const disabledClasses = "opacity-50 cursor-not-allowed";
  const hoverClasses = "hover:shadow-lg transform hover:-translate-y-1";

  const variants = {
    filled: `bg-${color}-600 text-white hover:bg-${color}-700 ${hoverClasses}`,
    outlined: `border-2 border-${color}-600 text-${color}-600 hover:bg-${color}-50 ${hoverClasses}`,
  };

  return (
    <button
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${disabled ? disabledClasses : ""}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        icon
      )}
      {label}
    </button>
  );
};

export default Button;
