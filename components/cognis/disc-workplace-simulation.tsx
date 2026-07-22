"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  sender: string
  text: string
  delay: number
  isSelf?: boolean
  isTrigger?: boolean
}

interface ResponseOption {
  id: string
  text: string
}

interface DiSCWorkplaceSimulationProps {
  channelName: string
  status?: "online" | "offline"
  messages: Message[]
  responseOptions: ResponseOption[]
  onResponse?: (optionId: string) => void
  className?: string
}
function TypingIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      className="flex items-center gap-1 px-4 py-3"
    >
      <span className="text-[10px] font-mono text-accent-red mr-2">
        {/* Empty sender name space for alignment */}
      </span>
      <div className="flex items-center gap-[3px]">
        <span className="w-[5px] h-[5px] rounded-full bg-text-muted animate-typing-dot-1" />
        <span className="w-[5px] h-[5px] rounded-full bg-text-muted animate-typing-dot-2" />
        <span className="w-[5px] h-[5px] rounded-full bg-text-muted animate-typing-dot-3" />
      </div>
      <span className="text-[10px] font-mono text-text-muted ml-2">正在输入...</span>
    </motion.div>
  )
}
function ChatBubble({ 
  message, 
  showTimestamp = true 
}: { 
  message: Message
  showTimestamp?: boolean 
}) {
  const timestamp = new Date().toLocaleTimeString("zh-CN", { 
    hour: "2-digit", 
    minute: "2-digit" 
  })

  if (message.isSelf) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 10, y: 5 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="flex flex-col items-end mb-3"
      >
        <div 
          className="max-w-[80%] px-4 py-3 bg-bg-surface rounded-[2px] border border-white/5"
        >
          <p className="text-[13px] font-mono text-text-primary leading-relaxed">
            {message.text}
          </p>
        </div>
        {showTimestamp && (
          <span className="text-[9px] font-mono text-text-ghost mt-1 mr-1">
            {timestamp}
          </span>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10, y: 5 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="flex flex-col items-start mb-3"
    >
      <span className="text-[10px] font-mono text-accent-red mb-1 ml-1">
        {message.sender}
      </span>
      <div 
        className={cn(
          "max-w-[80%] px-4 py-3 bg-[#1A1A1A] rounded-[2px] border border-white/5",
          message.isTrigger && "border-accent-red/20 shadow-[0_0_10px_rgba(232,64,64,0.05)]"
        )}
      >
        <p className="text-[13px] font-mono text-text-primary leading-relaxed">
          {message.text}
        </p>
      </div>
      {showTimestamp && (
        <span className="text-[9px] font-mono text-text-ghost mt-1 ml-1">
          {timestamp}
        </span>
      )}
    </motion.div>
  )
}

export function DiSCWorkplaceSimulation({
  channelName,
  status = "online",
  messages,
  responseOptions,
  onResponse,
  className,
}: DiSCWorkplaceSimulationProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [showTyping, setShowTyping] = useState(false)
  const [showResponsePanel, setShowResponsePanel] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageAreaRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [visibleMessages, showTyping])
  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = []
    let cumulativeDelay = 0

    messages.forEach((message, index) => {
      cumulativeDelay += message.delay + 300 // Base 300ms between messages

      const timeoutId = setTimeout(() => {
        setVisibleMessages(prev => [...prev, message])
        if (message.isTrigger) {
          setTimeout(() => {
            setShowTyping(true)
            setTimeout(() => {
              setShowTyping(false)
              setTimeout(() => {
                setShowResponsePanel(true)
              }, 200)
            }, 1000)
          }, 800)
        }
      }, cumulativeDelay)

      timeoutIds.push(timeoutId)
    })

    return () => {
      timeoutIds.forEach(id => clearTimeout(id))
    }
  }, [messages])

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
    setTimeout(() => {
      onResponse?.(optionId)
    }, 400)
  }

  return (
    <div className={cn("flex flex-col w-full border border-white/5 bg-bg-surface/30 rounded-sm relative overflow-hidden", className)}>
      {/* Top bar - simulated chat header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-text-primary">
            {channelName}
          </span>
          <div className="flex items-center gap-1">
            <span 
              className={cn(
                "w-1 h-1 rounded-full",
                status === "online" ? "bg-[#22C55E]" : "bg-text-ghost"
              )} 
            />
            <span className="text-[9px] font-mono text-text-muted">
              {status === "online" ? "在线" : "离线"}
            </span>
          </div>
        </div>
      </div>

      {/* Message area */}
      <div 
        ref={messageAreaRef}
        className="flex-1 overflow-y-auto px-4 py-4 max-h-[380px] min-h-[280px]"
      >
        {visibleMessages.map((message, index) => (
          <ChatBubble 
            key={index} 
            message={message}
            showTimestamp={
              index === visibleMessages.length - 1 || 
              visibleMessages[index + 1]?.isSelf !== message.isSelf
            }
          />
        ))}
        
        {showTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Response options panel */}
      <AnimatePresence>
        {showResponsePanel && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="border-t border-white/[0.08] bg-[#111111] z-20"
            style={{ 
              position: "relative",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <div className="px-4 py-2 border-b border-white/[0.02]">
              <span className="text-[10px] font-mono text-text-ghost uppercase tracking-wider">
                选择你的回应方式 // SELECT RESPONSE PROTOCOL
              </span>
            </div>
            
            <div className="flex flex-col">
              {responseOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={selectedOption !== null}
                  className={cn(
                    "h-16 px-4 text-left border-b border-white/[0.04]",
                    "text-[12px] font-mono text-text-muted leading-relaxed",
                    "transition-all duration-150",
                    "hover:bg-white/[0.04] hover:text-text-primary",
                    "disabled:cursor-not-allowed",
                    selectedOption === option.id && "border-l-2 border-l-accent-red bg-accent-red/5 text-text-primary"
                  )}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
