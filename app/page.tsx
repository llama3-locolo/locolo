import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 py-10 px-10 background-gradient">
      <Header />
      <ChatSection />
      <Image alt="QR Code" src="/qrcode.svg" height={180} width={180} />
    </main>
  );
}
