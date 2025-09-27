import { useEffect, useRef, useState } from "react";
import { AskBar } from "./ask-bar";
import { ChatMessage } from "./chat-message";
import { useSagarAI } from "../../api/sagarAI";
import { useCallback ,useLayoutEffect} from "react";
import { TbProgressX } from 'react-icons/tb';


// Connection Fields for SagarAI Services 
const URI = "ws://localhost:8000";
const endPoint = "/sagarAI";


// UI Components with Handling Functions for SagarAI Client Interface 
const SagarAiPage = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("idle");
  const listRef = useRef(null);
  const endRef = useRef(null); 
  const [autoScroll, setAutoScroll] = useState(true);
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const handleScroll = () => {
      const threshold = 64; 
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
      if (atBottom) {
        setAutoScroll(true);
        setUserScrolledUp(false);
      } else {
        setAutoScroll(false);
        setUserScrolledUp(true);  // user has scrolled away
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = useCallback((behavior = "smooth") => {
    
    endRef.current?.scrollIntoView({ behavior, block: "end" });
    
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, []);
  // To Manage Cancelled Prompts from users 
  const messageVersion = useRef(0);
  const activeVersion = useRef(0);

  
  // Handler Function for Message recieved from server 
  const handleSagarMessage = useCallback((message) => {

      // Neglect Tokens recieved from cancelled prompts
      if (messageVersion.current !== activeVersion.current) {
        return;
      }

      // Add recieved tokens to Latest Active System Message
      if (message.type === "token") {
        setMessages((prevChat) => {
          const chats = [...prevChat];
          const lastIndex = chats.length - 1;

          // Handing Exceptions Check if Message Component is available and it is System Type
          if (lastIndex >= 0 && chats[lastIndex].role === "system") {
            // message.message is token from Parsed JSON Object
            // Appending Tokens to message as it comes in stream 
            const updatedMessage = {
              ...chats[lastIndex],content: chats[lastIndex].content + message.message,
            };

            // Set Message to Updated Message after Appending
            chats[lastIndex] = updatedMessage;
          }
          return chats;
        });
          // Streaming tokens
        if (autoScroll && !userScrolledUp){
          queueMicrotask(() => scrollToBottom("auto"));
        }

        // On response completion
        if (autoScroll && !userScrolledUp){
          queueMicrotask(() => scrollToBottom("smooth"));
        }

      }

      // Response completed then Allow Input for other prompts
      if (message.type === "done") {
        console.log("Done");
        setStatus("idle");
        // Streaming tokens
      if (autoScroll && !userScrolledUp){
        queueMicrotask(() => scrollToBottom("auto"));
      }

      // On response completion
      if (autoScroll && !userScrolledUp){
        queueMicrotask(() => scrollToBottom("smooth"));
      }

      }
    },
    [scrollToBottom,setMessages, setStatus]
  );

  // Initialize Connection to SagarAI Services
  const { ask } = useSagarAI(URI, endPoint,handleSagarMessage);
  // Send user message
  function handleAsk(prompt) {
    // Create a User Message Element 
    const promptMessage = { id: crypto.randomUUID(), role: "user", content: prompt, prompt };
    setMessages((prev) => [...prev, promptMessage]);
    setStatus("in_progress");

    // Update states to keep track 
    messageVersion.current += 1;
    activeVersion.current = messageVersion.current;

    // Send prompt request to server 
    ask(prompt);

    // Create a Empty System Message for upcomming response from server for this query
    const responseMessage = { id: crypto.randomUUID(), role: "system", content: ""};
    setMessages((prev) => [...prev, responseMessage]);

    // Streaming tokens
    if (autoScroll && !userScrolledUp){
      queueMicrotask(() => scrollToBottom("auto"));
    }

    // On response completion
    if (autoScroll && !userScrolledUp){
      queueMicrotask(() => scrollToBottom("smooth"));
    }

  }


  // Cancel current prompt in between using cancell button in UI
  function handleCancel() {
    messageVersion.current += 1;
    setStatus("idle");
  }


  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 bg-white z-20 flex h-12 items-center justify-start border-b-1 px-3 mx-2 border-b-gray-300">
          <h4 className="text-lg font-semibold text-primary text-dark-gray">Sagar AI</h4>
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
            <section ref={listRef} className="flex-1 border-l border-gray-300 border-border mx-2 overflow-y-auto px-4" aria-label="Chat history" role="log">
              <div className="mx-auto w-full max-w-2xl py-6 flex flex-col gap-4">
                {messages.map((m) => (
                  <ChatMessage key={m.id} message={m} />
                ))}
                <div ref={endRef}  />
              </div>
              
            </section>

            <div className="sticky bottom-0 inset-x-0 border-t border-t-gray-300 mx-2 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="mx-auto w-full max-w-2xl px-4 py-4 flex gap-2 items-center">
                <AskBar
                  disabled={status === "in_progress"}
                  onAsk={handleAsk}
                  placeholder="Ask Sagar AI"
                />
                {status === "in_progress" && (
                  <TbProgressX onClick={handleCancel}
                    className="text-4xl hover:text-red-500"
                  />
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default SagarAiPage;
