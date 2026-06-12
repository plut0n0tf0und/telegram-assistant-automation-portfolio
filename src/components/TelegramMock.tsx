"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  PaperPlaneTilt, 
  User, 
  Robot, 
  ArrowCounterClockwise, 
  Checks, 
  List 
} from "@phosphor-icons/react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  isTable?: boolean;
  buttons?: Array<{ text: string; action: string }>;
}

export default function TelegramMock() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [cart, setCart] = useState({ apple: 0, orange: 0 });
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [timeStr, setTimeStr] = useState("9:41");

  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
  };

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const startAutomatedDemo = () => {
    clearAllTimeouts();
    setCart({ apple: 0, orange: 0 });
    setMessages([]);
    setIsTyping(false);

    // 1. User -> View Today's Items (0.6s)
    const t1 = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: "demo-user-1",
          sender: "user",
          text: "View Today's Items",
          timestamp: getTimestamp()
        }
      ]);
    }, 600);

    // 2. Bot typing indicator (1.2s)
    const t2 = setTimeout(() => {
      setIsTyping(true);
    }, 1200);

    // 3. Bot -> Fetching inventory... (2.2s)
    const t3 = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: "demo-bot-1",
          sender: "bot",
          text: "🔍 Fetching inventory from Google Sheets...",
          timestamp: getTimestamp()
        }
      ]);
    }, 2200);

    // 4. Bot typing indicator (2.8s)
    const t4 = setTimeout(() => {
      setIsTyping(true);
    }, 2800);

    // 5. Bot -> Product List (3.8s)
    const t5 = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: "demo-bot-2",
          sender: "bot",
          text: "🛒 *TODAY ITEMS LIST*\n```\nItem      | Qty | Price | Avail \n----------+-----+-------+-------\nApples    | 50  | ₹120  |  Yes  \nOranges   | 35  |  ₹80  |  Yes  \nBananas   |  0  |  ₹40  |  No   \nPineapple | 12  | ₹180  |  Yes  \n```",
          timestamp: getTimestamp(),
          isTable: true,
          buttons: [
            { text: "🍎 Apple (+1)", action: "add_apple" },
            { text: "🍊 Orange (+1)", action: "add_orange" },
            { text: "💳 Book & Pay", action: "checkout" }
          ]
        }
      ]);
    }, 3800);

    timeoutIdsRef.current = [t1, t2, t3, t4, t5];
  };

  useEffect(() => {
    startAutomatedDemo();
    
    // Set dynamic client time on mount to prevent SSR hydration warnings
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => {
      clearInterval(interval);
      clearAllTimeouts();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const simulateBotReply = (responseText: string, buttons?: Array<{ text: string; action: string }>, isTable = false) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: responseText,
          timestamp: getTimestamp(),
          isTable,
          buttons
        }
      ]);
    }, 800);
  };

  const handleButtonClick = (action: string, buttonText: string) => {
    // 1. Add User response bubble
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: "user",
        text: buttonText,
        timestamp: getTimestamp(),
      }
    ]);

    // 2. Hide buttons on previous messages to simulate interactive workflow progress
    setMessages(prev => 
      prev.map(m => m.sender === "bot" ? { ...m, buttons: undefined } : m)
    );

    // 3. Trigger corresponding bot workflow paths
    if (action === "Send_items" || action === "view_items") {
      simulateBotReply(
        "Hello there,\n\n🛒 *TODAY ITEMS LIST*\n```\nItem      | Qty | Price | Avail \n----------+-----+-------+-------\nApples    | 50  | ₹120  |  Yes  \nOranges   | 35  |  ₹80  |  Yes  \nBananas   |  0  |  ₹40  |  No   \nPineapple | 12  | ₹180  |  Yes  \n```",
        [
          { text: "🍎 Apple (+1)", action: "add_apple" },
          { text: "🍊 Orange (+1)", action: "add_orange" },
          { text: "↩️ Back to Menu", action: "back_to_menu" }
        ],
        true
      );
    } else if (action === "add_apple") {
      const nextApple = cart.apple + 1;
      const nextCart = { ...cart, apple: nextApple };
      setCart(nextCart);

      const total = nextCart.apple * 120 + nextCart.orange * 80;

      simulateBotReply(
        `🛒 *Cart Updated!*\n\n• Apples: *${nextCart.apple}* (₹${nextCart.apple * 120})\n• Oranges: *${nextCart.orange}* (₹${nextCart.orange * 80})\n• Total Amount: *₹${total}*\n\nAdd more items or proceed to booking:`,
        [
          { text: "🍎 Apple (+1)", action: "add_apple" },
          { text: "🍊 Orange (+1)", action: "add_orange" },
          { text: "💳 Book & Pay", action: "checkout" }
        ]
      );
    } else if (action === "add_orange") {
      const nextOrange = cart.orange + 1;
      const nextCart = { ...cart, orange: nextOrange };
      setCart(nextCart);

      const total = nextCart.apple * 120 + nextCart.orange * 80;

      simulateBotReply(
        `🛒 *Cart Updated!*\n\n• Apples: *${nextCart.apple}* (₹${nextCart.apple * 120})\n• Oranges: *${nextCart.orange}* (₹${nextCart.orange * 80})\n• Total Amount: *₹${total}*\n\nAdd more items or proceed to booking:`,
        [
          { text: "🍎 Apple (+1)", action: "add_apple" },
          { text: "🍊 Orange (+1)", action: "add_orange" },
          { text: "💳 Book & Pay", action: "checkout" }
        ]
      );
    } else if (action === "checkout") {
      const total = cart.apple * 120 + cart.orange * 80;
      
      if (total === 0) {
        simulateBotReply(
          "⚠️ *Your cart is empty!* Please add items first.",
          [
            { text: "🍎 Apple (+1)", action: "add_apple" },
            { text: "🍊 Orange (+1)", action: "add_orange" },
            { text: "↩️ Back to Menu", action: "back_to_menu" }
          ]
        );
      } else {
        simulateBotReply(
          `📦 *Order Summary & Booking*\n\n• Apples: *${cart.apple}x* (₹${cart.apple * 120})\n• Oranges: *${cart.orange}x* (₹${cart.orange * 80})\n• Total: *₹${total}*\n\nComplete your payment to finalize booking:\n\n🔗 [Pay via MockPay (Spoof Link)](https://checkout.mockpay.example.com/checkout)\n\n_Once mock payment is processed, n8n updates Sheets database inventory automatically._`,
          [
            { text: "↩️ Main Menu", action: "back_to_menu" }
          ]
        );
      }
    } else if (action === "Send_support" || action === "support") {
      simulateBotReply(
        "Please Call this numeber",
        [
          { text: "+ 91 xxxxxxxxxx", action: "call" },
          { text: "↩️ Back to Menu", action: "back_to_menu" }
        ]
      );
    } else if (action === "call") {
      simulateBotReply(
        "Our team will call you back",
        [
          { text: "↩️ Back to Menu", action: "back_to_menu" }
        ]
      );
    } else if (action === "back_to_menu" || action === "main_menu") {
      setCart({ apple: 0, orange: 0 }); // reset cart
      simulateBotReply(
        "Hello User,\nChoose an option:",
        [
          { text: "View Today Items", action: "Send_items" },
          { text: "Support", action: "Send_support" }
        ]
      );
    }
  };

  return (
    <div className="w-full h-full bg-[var(--color-background)] flex flex-col">
      
      {/* iOS Status Bar (Designed to sit perfectly under Dynamic Island) */}
      <div className="h-11 px-5 sm:px-6 pt-4 pb-1 bg-[var(--color-surface)] border-b border-[var(--color-outline-variant)] flex items-center justify-between text-xs text-white font-semibold select-none z-20 shrink-0">
        <span className="font-sans leading-none tracking-tight text-[13px]">{timeStr}</span>
        <div className="flex items-center gap-1.5 text-white/90">
          {/* Battery Icon */}
          <div className="w-5.5 h-3.25 border border-white/75 rounded-[4.5px] p-[1.5px] flex items-center opacity-90">
            <div className="h-full w-3.5 bg-white rounded-[1.5px]"></div>
            <div className="w-[1.5px] h-1.5 bg-white/75 rounded-r-[1px] ml-[1px] shrink-0"></div>
          </div>
        </div>
      </div>
      
      {/* Real Telegram Dark Title Header */}
      <div className="px-4 py-3 bg-[var(--color-surface)] border-b border-[var(--color-outline)] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-surface-container-high)] flex items-center justify-center border border-[var(--color-outline)]">
            <Robot weight="duotone" className="w-5.5 h-5.5 text-white" />
          </div>
          <div>
            <h5 className="text-base font-bold text-white tracking-wide leading-tight">
              Fresh Shop Bot
            </h5>
            <p className="text-xs text-[var(--color-on-surface-variant)] font-mono mt-0.5">bot</p>
          </div>
        </div>
        
        <button 
          onClick={startAutomatedDemo}
          className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          title="Restart Demo"
        >
          <ArrowCounterClockwise className="w-5 h-5" />
        </button>
      </div>

      {/* Message History area */}
      <div ref={chatContainerRef} className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar bg-[var(--color-background)]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col animate-message-appear ${m.sender === "user" ? "items-end" : "items-start"}`}
          >
            {/* Message Bubble */}
            <div
              className={m.sender === "user" ? "chat-bubble-user" : "chat-bubble-bot"}
            >
              <div className="whitespace-pre-wrap font-sans">
                {m.isTable ? (
                  <div className="font-mono text-sm text-[#81c784] overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar">
                    {m.text}
                  </div>
                ) : (
                  m.text.split("\n").map((line, idx) => {
                    let content: React.ReactNode = line;
                    // Simple formatting parser
                    if (line.includes("[Pay via MockPay (Spoof Link)]")) {
                      const payText = "🔗 Pay via MockPay (Spoof Link)";
                      content = (
                        <a 
                          href="https://checkout.mockpay.example.com/checkout" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-white underline hover:text-white/80 font-bold"
                        >
                          {payText}
                        </a>
                      );
                    } else if (line.startsWith("• ")) {
                      content = <span>• {line.substring(2)}</span>;
                    }
                    return <div key={idx}>{content}</div>;
                  })
                )}
              </div>

              {/* read checks */}
              <div className="flex items-center justify-end gap-1 mt-1.5 text-[10px] opacity-60 text-right select-none font-mono">
                <span>{m.timestamp}</span>
                {m.sender === "user" && <Checks className="w-4 h-4 text-white/85" />}
              </div>
            </div>

            {/* Buttons layout */}
            {m.buttons && m.buttons.length > 0 && (
              <div className="w-full max-w-[85%] mt-2 grid grid-cols-2 gap-1.5 animate-message-appear">
                {m.buttons.map((btn, bidx) => (
                  <button
                    key={bidx}
                    onClick={() => handleButtonClick(btn.action, btn.text)}
                    className="col-span-1 bg-[var(--color-surface-container-high)] hover:bg-[var(--color-surface-container-highest)] border border-[var(--color-outline)] text-sm font-bold text-white py-2 px-3 rounded-[6px] text-center transition-colors select-none duration-150 cursor-pointer active:scale-[0.98]"
                  >
                    {btn.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* typing animation */}
        {isTyping && (
          <div className="flex items-center gap-1.5 bg-[var(--color-surface-container)] border border-[var(--color-outline)] px-4 py-2.5 rounded-[10px] rounded-tl-none max-w-[90px] animate-message-appear">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </div>

      {/* footer bar */}
      <div className="p-4 bg-[var(--color-surface)] border-t border-[var(--color-outline)] flex items-center gap-3 shrink-0">
        <div className="flex-1 bg-[var(--color-surface-container)] border border-[var(--color-outline)] px-4 py-2.5 rounded-full text-sm text-gray-400 flex items-center select-none justify-between">
          <span>Interaction disabled. Use buttons above.</span>
          <List className="w-5 h-5 text-gray-400" />
        </div>
        <div className="p-2.5 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-full transition-opacity hover:opacity-90 cursor-pointer">
          <PaperPlaneTilt className="w-5 h-5" />
        </div>
      </div>

      {/* Home Indicator */}
      <div className="h-6 bg-[var(--color-surface)] flex items-center justify-center pb-2 shrink-0 z-20 select-none">
        <div className="w-32 h-[4px] bg-white/20 rounded-full" />
      </div>
    </div>
  );
}
