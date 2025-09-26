import { cn } from "../../utils/cn"

export default function ChatMessage({ role, content }) {
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
    <div className={cn("w-full flex mb-3", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
        )}
        aria-label={isUser ? "User message" : "Assistant message"}
      >
        {text}
      </div>
    </div>
  )
}

export { ChatMessage }
