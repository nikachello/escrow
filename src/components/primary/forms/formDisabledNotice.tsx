import React from "react";

interface FormDisabledNoticeProps {
  message: string;
  type?: "warning" | "info" | "error";
  className?: string;
}

export const FormDisabledNotice: React.FC<FormDisabledNoticeProps> = ({
  message,
  type = "warning",
  className = "",
}) => {
  const typeClasses = {
    warning:
      "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200",
    error:
      "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200",
  };

  return (
    <div className={`p-4 border rounded-md ${typeClasses[type]} ${className}`}>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default FormDisabledNotice;
