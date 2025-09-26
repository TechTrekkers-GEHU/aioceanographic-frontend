import { useEffect, useRef, useState } from "react";
import Sidebar from "../sidebar";
import { AskBar } from "./ask-bar";
import { ChatMessage } from "./chat-message";
import { sendToSagarAI } from "../../services/sagarai";

const SagarAiPage =() => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("idle"); 
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleAsk(text) {
    const userMsg = { id: crypto.randomUUID(), role: "user", content: text, text };
    setMessages((prev) => [...prev, userMsg]);
    setStatus("in_progress");
    try {
      const aiMsg = await sendToSagarAI(text);
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry, yeh vineet ne kaam dhang se  nhi kra.",
          text: "Sorry, yeh vineet ne kaam dhang se  nhi kra.",
        },
      ]);
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar activeModule={"SagarAi"} setActiveModule={() => {}} />
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-1 bg-white z-20 flex h-12 items-center justify-start border-b-1  px-3 mx-2  border-b-gray-300">
          <span className="text-sm text-muted-foreground" aria-live="polite">
            <h4 className="text-lg font-semibold text-primary text-dark-gray">Sagar AI</h4>
          </span>
        </header>

        {messages.length === 0 ? (
          <section className="flex flex-1 items-center justify-center px-4">
            <div className="mx-auto w-full max-w-2xl text-center">
              <h1 className="text-pretty text-4xl font-semibold text-primary text-cyan-azure">Hello, Vineet</h1>
              <p className="mt-2 text-m text-muted-foreground text-dark-gray">
                Hello! Ready to explore the depths? From sensor data to climate trends, ask away!
              </p>
              <AskBar
                className="mt-10"
                disabled={status === "in_progress"}
                onAsk={handleAsk}
                placeholder="Ask Sagar AI"
              />
            </div>
          </section>
        ) : (
          <>
            <section ref={listRef} className="flex-1 overflow-y-auto px-4" aria-label="Chat history" role="log">
              <div className="mx-auto w-full max-w-2xl py-6 flex flex-col gap-4">
                {messages.map((m) => (
                  <ChatMessage key={m.id} message={m} />
                ))}
              </div>
            </section>

            <div className="sticky bottom-0 inset-x-0 border-t border-t-gray-300 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="mx-auto w-full max-w-2xl px-4 py-4">
                <AskBar
                  disabled={status === "in_progress"}
                  onAsk={handleAsk}
                  placeholder="Ask Sagar AI"
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default SagarAiPage;