import { Check, Copy } from "lucide-react";

import { Button } from "./button";
import { useCopyToClipboard } from "./chat/use-copy-to-clipboard";

export function Chip({ value }: { value: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  return (
    <div className="inline-block border bg-gray-50 border-gray-100 shadow-sm rounded-full m-1 px-3.5 py-2.5">
      {value}
      <Button
        onClick={() => copyToClipboard(value)}
        size="icon"
        variant="ghost"
        className="h-6 w-6 ml-1"
      >
        {isCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}