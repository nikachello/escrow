import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolTipProps {
  ButtonText: string;
  content: string;
}

export default function TooltipCustom({ ButtonText, content }: ToolTipProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 text-sm px-1 rounded-xl border border-gray-300"
          >
            {ButtonText}
          </button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs max-w-xs">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
