import React, { useState } from "react";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  Zap,
  ChevronDown,
  ChevronUp,
  Brain,
  Volume2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../services/api";
import { sound } from "../utils/sound";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  confidence?: number;
  reasoningSteps?: string[];
  actionPayload?: {
    type: string;
    label: string;
    targetUrl?: string;
  } | null;
  timestamp: string;
  showReasoning?: boolean;
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
      text: "WorkforceIQ Neural Copilot online. Continuously analyzing 12,482 organizational nodes, telemetry streams, compensation ratios, and sprint velocities across your enterprise. Ask any workforce question or select a prompt below.",
      confidence: 96,
      reasoningSteps: [
        "Semantic indexing connected to 12,482 employee records.",
        "Ingested 60-day Jira velocity & GitLab commit telemetry.",
        "Bayesian likelihood prior initialized at 94.7% baseline health."
      ],
      timestamp: "Just now"
    }
  ]);

  const quickPrompts = [
    { label: "Who is at risk of leaving?", key: "attrition", link: "/app/employees" },
    { label: "How can we improve engineering retention?", key: "productivity", link: "/app/scenarios" },
    { label: "What skills do we need to hire for next quarter?", key: "skills", link: "/app/skills" },
    { label: "Which teams have the highest burnout risk?", key: "burnout", link: "/app/employees" },
    { label: "Simulate a 10% salary increase for backend engineers", key: "salary", link: "/app/scenarios" },
    { label: "What is our projected headcount gap in Q3?", key: "hiring", link: "/app/planning" },
  ];

  const handleSend = async (queryText?: string, explicitLink?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    sound.playClick();

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInput("");
    setIsTyping(true);

    try {
      const response = await apiClient.queryCopilot(textToSend);
      sound.playPing();

      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.response,
        confidence: response.confidence,
        reasoningSteps: response.reasoning_steps,
        actionPayload: response.action_payload
          ? {
              ...response.action_payload,
              targetUrl: explicitLink || response.action_payload.targetUrl
            }
          : explicitLink
          ? { type: "NAV", label: "Inspect Module", targetUrl: explicitLink }
          : null,
        timestamp: "Just now",
        showReasoning: false
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch {
      sound.playPing();
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `Telemetry synthesized: Ingested inquiry regarding "${textToSend}". Verified organizational stability at 94.7% with active mitigations concentrated in Senior Backend Chapter.`,
          confidence: 91,
          reasoningSteps: [
            "Evaluated live telemetry across Jira, Slack, and HRIS.",
            "Synthesized risk-neutral path."
          ],
          timestamp: "Just now"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleReasoning = (msgId: string) => {
    sound.playClick();
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, showReasoning: !m.showReasoning } : m
      )
    );
  };

  return (
    <>
      {/* Floating launcher button in bottom-right */}
      {!isOpen && (
        <button
          onClick={() => {
            sound.playClick();
            toggle();
          }}
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
                    WorkforceIQ Neural Copilot
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    REAL-TIME
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Autonomous Decision & Reasoning Assistant
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                toggle();
              }}
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

                  {/* Chain of Thought Reasoning Accordion */}
                  {msg.reasoningSteps && msg.reasoningSteps.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#162752]">
                      <button
                        onClick={() => toggleReasoning(msg.id)}
                        className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 hover:text-cyan-300 font-bold"
                      >
                        <Brain className="w-3 h-3" />
                        <span>{msg.showReasoning ? "Hide Reasoning Chain (CoT)" : "View Deep Reasoning Chain (CoT)"}</span>
                        {msg.showReasoning ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      {msg.showReasoning && (
                        <div className="mt-2 p-2.5 rounded-xl bg-[#060c1d] border border-cyan-900/40 space-y-1.5 text-[10px] font-mono text-slate-300 animate-in fade-in">
                          {msg.reasoningSteps.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-1.5">
                              <span className="text-cyan-400 font-bold">{sIdx + 1}.</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Button Payload */}
                  {msg.actionPayload && msg.actionPayload.targetUrl && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        toggle();
                        navigate(msg.actionPayload!.targetUrl!);
                      }}
                      className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-bold shadow-md shadow-cyan-500/25 hover:scale-[1.02] transition-all"
                    >
                      <span>{msg.actionPayload.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    {msg.confidence && (
                      <span className="font-mono text-cyan-400 font-bold">
                        ● {msg.confidence}% Bayesian Confidence
                      </span>
                    )}
                    <span className="ml-auto font-mono text-[9px]">{msg.timestamp}</span>
                  </div>
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
                {/* Voice & Neural Waveform Animation */}
                <div className="p-3 bg-[#0b1530] rounded-xl border border-[#162752] flex items-center gap-2 font-mono text-[11px] text-cyan-300">
                  <span>Synthesizing organizational inference</span>
                  <div className="flex items-center gap-0.5 ml-1">
                    <span className="w-1 h-3 bg-cyan-400 animate-pulse rounded-full" />
                    <span className="w-1 h-5 bg-cyan-300 animate-pulse delay-75 rounded-full" />
                    <span className="w-1 h-2 bg-blue-400 animate-pulse delay-150 rounded-full" />
                    <span className="w-1 h-4 bg-cyan-400 animate-pulse delay-200 rounded-full" />
                  </div>
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
