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
      <div className={`${manrope.className} my-5 flex flex-col lg:flex-row items-start gap-6 p-6 border bg-slate-50 border-[#FFA500] rounded-lg shadow-md`}>
        <img alt={"Event Image"} src={jsonData["Image"]} className="w-full lg:max-w-[270px] max-h-[270px] my-auto mx-auto flex-shrink-0 rounded-lg object-scale-down" />
        <div className="flex flex-col lg:flex-row text-wrap gap-3">
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-bold">{jsonData["Event Name"]}</h3>
              <p className="text-gray-500 dark:text-gray-400">Hosted by {jsonData["Organizer"]}</p>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{jsonData["Description"]}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Date & Time</p>
                <p className="text-gray-700 dark:text-gray-300">{jsonData["Date and Time"]}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Location</p>
                <p className="text-gray-700 dark:text-gray-300">{jsonData["Location"]}</p>
              </div>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 w-full md:w-fit"
              href={jsonData["URL"]}
              target="_blank"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
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
