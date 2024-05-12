/* eslint-disable @next/next/no-img-element */
"use client";

import { Check, Copy, Download } from "lucide-react";
import { FC, memo } from "react";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Button } from "../button";
import { useCopyToClipboard } from "./use-copy-to-clipboard";
import Image from "next/image";
import { Manrope } from "next/font/google";

// TODO: Remove this when @type/react-syntax-highlighter is updated
const SyntaxHighlighter = Prism as unknown as FC<SyntaxHighlighterProps>;

interface Props {
  language: string;
  value: string;
}

interface languageMap {
  [key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  typescript: ".ts",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

const manrope = Manrope({ subsets: ["latin"] });

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXY3456789"; // excluding similar looking characters like Z, 2, I, 1, O, 0
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const downloadAsFile = () => {
    if (typeof window === "undefined") {
      return;
    }
    const fileExtension = programmingLanguages[language] || ".file";
    const suggestedFileName = `file-${generateRandomString(
      3,
      true,
    )}${fileExtension}`;
    const fileName = window.prompt("Enter file name" || "", suggestedFileName);

    if (!fileName) {
      // User pressed cancel on prompt.
      return;
    }

    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(value);
  };

  try {
    const jsonData = JSON.parse(value);
    console.log(jsonData);
    return (
      <a href={jsonData["URL"]} target="_blank" className={manrope.className}>
        <div className="font-sans border bg-slate-50 border-[#FFA500] rounded-lg my-5 p-5 w-full transition hover:shadow-lg">
          <div className="flex flex-col lg:flex-row text-wrap gap-3">
            <div className="w-full lg:w-2/3">
              <div className="text-xl mb-3 text-bold">{jsonData["Event Name"]}</div>
              <div className="text-xs text-gray-500">{jsonData["Date and Time"]}</div>
              <div className="text-xs text-gray-500 mb-5">{jsonData["Location"]}</div>
              <div className="text-md">{jsonData["Description"]}</div>
            </div>
            <div className="w-full lg:w-1/3">
              {/* i am using img instead of Image because I don't want to set a height and width */}
              <img alt={"Data"} src={jsonData["Image"]} />
            </div>
          </div>
        </div>
      </a>
    );
  } catch (e) {
    return (
      <div className="codeblock relative w-full bg-zinc-950 font-sans">
        <div className="flex w-full items-center justify-between bg-zinc-800 px-6 py-2 pr-4 text-zinc-100">
          <span className="text-xs lowercase">{language}</span>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" onClick={downloadAsFile} size="icon">
              <Download />
              <span className="sr-only">Download</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onCopy}>
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
        </div>
        <SyntaxHighlighter
          language={language}
          style={coldarkDark}
          PreTag="div"
          showLineNumbers
          customStyle={{
            width: "100%",
            background: "transparent",
            padding: "1.5rem 1rem",
            borderRadius: "0.5rem",
          }}
          codeTagProps={{
            style: {
              fontSize: "0.9rem",
              fontFamily: "var(--font-mono)",
            },
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    );
  }
});
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
