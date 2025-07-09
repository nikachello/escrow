import React from "react";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  className = "",
  ariaLabel,
}) => {
  return (
    <section className={className} aria-label={ariaLabel || title}>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
};

export default FormSection;
