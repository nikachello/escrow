import React from "react";

interface LoadSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadSpinner: React.FC<LoadSpinnerProps> = ({
  message = "Loading...",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`flex flex-col justify-center items-center h-screen ${className}`}
    >
      <div
        className={`animate-spin rounded-full border-b-2 border-gray-900 ${sizeClasses[size]}`}
      />
      {message && <p className="text-lg text-gray-500 mt-4">{message}</p>}
    </div>
  );
};

export default LoadSpinner;
