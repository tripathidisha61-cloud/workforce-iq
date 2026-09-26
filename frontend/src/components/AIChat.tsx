import React, { useState } from "react";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  TrendingDown,
  ShieldAlert,
  Zap,
  CheckCircle,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { COPILOT_KNOWLEDGE_BASE } from "../data/mockData";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  confidence?: number;
  drivers?: string[];
  action?: string;
  targetLink?: string;
  timestamp: string;
}

interface AIChatProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen: controlledIsOpen, onToggle: controlledOnToggle }) => {
  const navigate = useNavigate();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggle = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: "WorkforceIQ Copilot online. I am continuously analyzing 12,482 organizational nodes, telemetry streams, compensation ratios, and sprint velocities across your enterprise. Ask any workforce question or select a prompt below.",
      confidence: 96,
      timestamp: "Just now"
    }
  ]);

  const quickPrompts = [
    { label: "Which teams have the highest attrition risk?", key: "attrition", link: "/app/scenarios" },
    { label: "Why is Engineering productivity declining?", key: "productivity", link: "/app/reports" },
    { label: "Who should be considered for promotion?", key: "promotion", link: "/app/employees" },
    { label: "Where do we have critical skill gaps?", key: "skills", link: "/app/skills" },
    { label: "How many engineers will we need next quarter?", key: "hiring", link: "/app/planning" },
    { label: "Show me employees at risk of burnout.", key: "burnout", link: "/app/employees" },
  ];

  const handleSend = (queryText?: string, explicitLink?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let matchedKey = "";
      if (lower.includes("attrition") || lower.includes("flight") || lower.includes("leave")) matchedKey = "attrition";
      else if (lower.includes("productivity") || lower.includes("velocity") || lower.includes("drop")) matchedKey = "productivity";
      else if (lower.includes("promotion") || lower.includes("advance") || lower.includes("ready")) matchedKey = "promotion";
      else if (lower.includes("skill") || lower.includes("training") || lower.includes("gap")) matchedKey = "skills";
      else if (lower.includes("hiring") || lower.includes("capacity") || lower.includes("recruit")) matchedKey = "hiring";
      else if (lower.includes("burnout") || lower.includes("overload") || lower.includes("workload")) matchedKey = "burnout";

      let botResponse: Message;

      if (matchedKey && COPILOT_KNOWLEDGE_BASE[matchedKey]) {
        const item = COPILOT_KNOWLEDGE_BASE[matchedKey];
        let link = explicitLink;
        if (!link) {
          if (matchedKey === "attrition") link = "/app/scenarios";
          else if (matchedKey === "burnout" || matchedKey === "promotion") link = "/app/employees";
          else if (matchedKey === "skills") link = "/app/skills";
          else if (matchedKey === "hiring") link = "/app/planning";
          else link = "/app/decisions";
        }

        botResponse = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: item.answer,
          confidence: item.confidence,
          drivers: item.drivers,
          action: item.action,
          targetLink: link,
          timestamp: "Just now"
        };
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `Telemetry analysis on "${textToSend}" complete: Cross-referencing 12,482 organizational signals indicates stable equilibrium across Core Engineering and Product divisions. No anomalous flight risk or SLA degradation detected outside the flagged Backend cohort.`,
          confidence: 91,
          drivers: [
            "Current retention rate: 94.7% (Above sector benchmark 88.5%)",
            "Sprint capacity headroom: 16.4%",
            "Employee pulse sentiment: 74/100"
          ],
          action: "Launch the Workforce Scenario Simulator to model predictive adjustments.",
          targetLink: "/app/scenarios",
          timestamp: "Just now"
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <>
      {/* Floating launcher button in bottom-right */}
      {!isOpen && (
        <button
          onClick={toggle}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 text-white font-bold text-xs shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105 transition-all duration-300 border border-cyan-300/30 group"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="tracking-wide">Ask WorkforceIQ</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/20 text-white font-bold">
            94%
          </span>
        </button>
      )}

      {/* Floating Copilot Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-lg h-[640px] bg-[#070e22] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 backdrop-blur-2xl">
          {/* Top Bar */}
          <div className="p-3.5 bg-gradient-to-r from-[#0a1430] via-[#0e1e4a] to-[#0a1430] border-b border-[#182a57] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px] shadow-md shadow-cyan-500/30">
                <div className="w-full h-full bg-[#070e22] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white tracking-wide">
                    WorkforceIQ Copilot
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    REAL-TIME
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Autonomous Decision Assistant
                </div>
              </div>
            </div>

            <button
              onClick={toggle}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#070e22] via-[#050a18] to-[#070e22]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/20 rounded-br-none"
                      : "bg-[#0b1530] border border-[#162752] text-slate-200 shadow-lg shadow-black/40 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* AI Structured Additions */}
                  {msg.drivers && msg.drivers.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#162752]">
                      <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold mb-1 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        <span>Telemetry Drivers</span>
                      </div>
                      <ul className="space-y-1">
                        {msg.drivers.map((driver, idx) => (
                          <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                            <span className="text-cyan-400 font-bold">•</span>
                            <span>{driver}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {msg.action && (
                    <div className="mt-2.5 p-2 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-[11px] text-cyan-200">
                      <strong className="text-cyan-300 block mb-0.5">Recommended Next Action:</strong>
                      {msg.action}
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    {msg.confidence && (
                      <span className="font-mono text-cyan-400">
                        {msg.confidence}% confidence
                      </span>
                    )}
                    <span className="ml-auto font-mono text-[9px]">{msg.timestamp}</span>
                  </div>

                  {msg.targetLink && (
                    <button
                      onClick={() => {
                        toggle();
                        navigate(msg.targetLink!);
                      }}
                      className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold transition-colors"
                    >
                      <span>Take Action in Module</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-blue-900 border border-blue-700/40 flex items-center justify-center text-blue-200 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="p-3 bg-[#0b1530] rounded-xl border border-[#162752] flex items-center gap-1.5 font-mono text-[11px]">
                  <span>Analyzing organizational graph</span>
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-2 bg-[#060b19] border-t border-[#142345] overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.label, p.link)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#0a142c] hover:bg-[#112046] border border-[#172750] text-[10px] text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1 shrink-0 font-medium"
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          {/* Input field */}
          <div className="p-3 bg-[#070e22] border-t border-[#152342] flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask WorkforceIQ (e.g., 'Who is at high attrition risk?')..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 bg-[#0b1530] border border-[#1a2c58] focus:border-cyan-400/60 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/30 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
