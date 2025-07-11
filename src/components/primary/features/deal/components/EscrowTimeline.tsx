"use client";

import { CheckCircle, Clock } from "lucide-react";

const ESCROW_STEPS = [
  { key: "agreement", title: "შეთანხმება" },
  { key: "payment", title: "გადახდა" },
  { key: "delivery", title: "მიწოდება" },
  { key: "inspection", title: "შემოწმება" },
  { key: "closed", title: "დახურვა" },
] as const;

type DealStatus = (typeof ESCROW_STEPS)[number]["key"];

interface EscrowTimelineProps {
  currentStatus: DealStatus;
}

interface StepProps {
  step: (typeof ESCROW_STEPS)[number];
  index: number;
  isCompleted: boolean;
  isCurrent: boolean;
  isLast: boolean;
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function StepIndicator({
  isCompleted,
  isCurrent,
  index,
}: Omit<StepProps, "step" | "isLast">) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-300 z-10 relative shrink-0",
        isCompleted
          ? "border-green-500 bg-green-500 text-white"
          : isCurrent
            ? "border-yellow-500 bg-yellow-50 text-yellow-500"
            : "border-gray-300 bg-white text-gray-300"
      )}
    >
      {isCompleted ? (
        <CheckCircle className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
      ) : isCurrent ? (
        <Clock className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 animate-pulse" />
      ) : (
        <span className="text-xs font-medium">{index + 1}</span>
      )}
    </div>
  );
}

function StepConnector({
  isCompleted,
  isLast,
}: Pick<StepProps, "isCompleted" | "isLast">) {
  if (isLast) return null;
  return (
    <div
      className={cn(
        "absolute top-3 xs:top-3.5 sm:top-4 left-1/2 h-0.5 transition-colors duration-300 z-0",
        isCompleted ? "bg-green-500" : "bg-gray-300"
      )}
      style={{
        transform: "translateX(12px)",
        width: "calc(100% - 12px)",
      }}
    />
  );
}

function Step({ step, index, isCompleted, isCurrent, isLast }: StepProps) {
  return (
    <div className="relative flex flex-1 flex-col items-center min-w-0 px-0.5">
      <StepIndicator
        isCompleted={isCompleted}
        isCurrent={isCurrent}
        index={index}
      />
      <StepConnector isCompleted={isCompleted} isLast={isLast} />
      <p
        className={cn(
          "mt-1.5 xs:mt-2 sm:mt-3 text-xs xs:text-xs sm:text-sm font-medium text-center transition-colors duration-300 leading-tight break-words hyphens-auto",
          isCompleted
            ? "text-green-600"
            : isCurrent
              ? "text-yellow-600"
              : "text-gray-400"
        )}
      >
        {step.title}
      </p>
    </div>
  );
}

export function EscrowTimeline({ currentStatus }: EscrowTimelineProps) {
  const currentIndex = ESCROW_STEPS.findIndex(
    (step) => step.key === currentStatus
  );

  return (
    <div className="w-full py-3 sm:py-4 overflow-hidden">
      <div className="relative flex items-start justify-between w-full">
        {ESCROW_STEPS.map((step, index) => (
          <Step
            key={step.key}
            step={step}
            index={index}
            isCompleted={index < currentIndex}
            isCurrent={index === currentIndex}
            isLast={index === ESCROW_STEPS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
