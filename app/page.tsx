import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 py-24 px-10 background-gradient">
      <ChatSection />
    </main>
  );
}
