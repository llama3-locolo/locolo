import Image from "next/image";

export default function Header() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
      <h1 className="text-4xl fixed left-0 top-0 flex w-full justify-center pb-4 pt-4 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border">
        Locolo
      </h1>
      <div className="fixed bottom-0 left-0 flex h-24 w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none invisible lg:visible">
        <p className="py-4 text-2xl">your vibe-based event curator.</p>
      </div>
    </div>
  );
}
