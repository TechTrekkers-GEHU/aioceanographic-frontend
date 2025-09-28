import { cn } from "../../utils/cn"
import Lottie from 'lottie-react'
import sagarAIWorking from '../../assets/sagarAI/sagarAIWorkingPromptIcon.json';
import sagarAIDone from '../../assets/sagarAI/sagarAIDonePromptIcon.png';
import sagarAIIntreputed from '../../assets/sagarAI/sagarAIIntruptedPromptIcon.png';

export default function ChatMessage({ role, content}) {
  // message, role,content are supported
  const props = arguments[0] || {}
  const message = props.message

  const derivedRole = role ?? message?.role ?? "assistant"

  let text = content
  if (text == null && message) {
    const mc = message.content
    if (typeof mc === "string") {
      text = mc
    } else if (Array.isArray(mc)) {
      const firstText = mc.find((p) => typeof p === "string" || p?.type === "text")
      text = typeof firstText === "string" ? firstText : firstText?.text
    } else if (typeof message.text === "string") {
      text = message.text
    }
  }

  const isUser = derivedRole === "user"
  return (
    <div className={cn("w-full flex mb-8", isUser ? "justify-end" : "justify-start")}>
      <>
        {!isUser && message.messageStatus === 'done' ? (
          <img src= {sagarAIDone} className="w-[60px] h-[60px] object-contain" />
        ) : !isUser && message.messageStatus === 'intreputed' ? (
          <img src= {sagarAIIntreputed} className="w-[60px] h-[60px] object-contain" />
        ) : !isUser ?(
          <Lottie loop animationData={sagarAIWorking} 
          play style={{ width: 80, height: 80,objectFit: "cover",overflow: "hidden", transform: "scale(1.5)",
                        transformOrigin: "center", clipPath: "inset(10% 10% 10% 10%)" }}
          />
        ):(<></>)}
      </>

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser ? "bg-gray-200 text-gray-800 ml-auto rounded-bl-2xl rounded-tl-2xl rounded-br-2xl rounded-tr" : "bg-muted text-foreground",
        )}
        aria-label={isUser ? "User message" : "Assistant message"}
        style={{ whiteSpace: "pre-line" }}
      >
        {text}
      </div>
    </div>
  )
}

export { ChatMessage }
