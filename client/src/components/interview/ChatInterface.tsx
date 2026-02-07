import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, StopCircle, User, Bot, Volume2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import avatarImage from '@/assets/ai-avatar.png'; // Make sure to use the generated asset

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  feedback?: {
    score: number;
    text: string;
  };
}

interface ChatInterfaceProps {
  roleId: string;
  roleTitle: string;
  initialQuestions: string[];
  onComplete: () => void;
}

export function ChatInterface({ roleId, roleTitle, initialQuestions, onComplete }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your AI interviewer for the ${roleTitle} position. Are you ready to begin?`
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 is intro
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    
    // Simulate thinking & evaluation
    setTimeout(() => {
      // 1. Generate Feedback for the user's answer (if it wasn't just "yes/ready")
      let feedback = undefined;
      if (currentQuestionIndex >= 0) {
        // Mock simple feedback logic
        feedback = {
          score: Math.floor(Math.random() * 3) + 7, // 7-9 score
          text: "Good structure, but try to be more specific about the technologies used."
        };
      }

      // 2. Determine next question
      const nextIndex = currentQuestionIndex + 1;
      let nextContent = "";
      
      if (currentQuestionIndex === -1) {
        // First real question
        nextContent = `Great. Let's start. ${initialQuestions[0]}`;
        setCurrentQuestionIndex(0);
      } else if (nextIndex < initialQuestions.length) {
        nextContent = `Thank you. Next question: ${initialQuestions[nextIndex]}`;
        setCurrentQuestionIndex(nextIndex);
      } else {
        nextContent = "That concludes our interview session. Let's review your performance.";
        setTimeout(onComplete, 3000);
      }
      
      // Update messages with feedback on PREVIOUS user msg (hacky visual way)
      // Actually better to show feedback as a separate system/insight pill
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: nextContent,
        feedback // Attach feedback to the bot's response about the previous answer
      };
      
      setMessages(prev => [...prev, botMsg]);
      speak(nextContent);

    }, 1500);
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
      // Mock result
      setInputValue(prev => prev + " I believe the most important factor is scalability.");
    } else {
      setIsListening(true);
      // In a real app, SpeechRecognition.start()
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
           <div className="relative">
             <div className={cn("w-2 h-2 rounded-full absolute -top-0.5 -right-0.5", isSpeaking ? "bg-green-500 animate-ping" : "bg-gray-500")} />
             <Bot className="w-5 h-5 text-primary" />
           </div>
           <div>
             <h3 className="font-medium text-sm">AI Interviewer</h3>
             <p className="text-xs text-muted-foreground">{roleTitle}</p>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-xs font-mono text-muted-foreground">
             {currentQuestionIndex + 1} / {initialQuestions.length}
           </span>
           <div className="h-1 w-20 bg-secondary rounded-full overflow-hidden">
             <div 
               className="h-full bg-primary transition-all duration-500"
               style={{ width: `${((currentQuestionIndex + 1) / initialQuestions.length) * 100}%` }}
             />
           </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              {/* Avatar */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm mt-1",
                msg.role === 'assistant' 
                  ? "bg-primary/20 border-primary/30" 
                  : "bg-secondary border-white/10"
              )}>
                {msg.role === 'assistant' 
                  ? <img src={avatarImage} className="w-full h-full object-cover rounded-full" /> 
                  : <User className="w-4 h-4" />
                }
              </div>

              {/* Bubble */}
              <div className="space-y-2">
                <div className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.role === 'assistant'
                    ? "bg-secondary/50 border border-white/5 text-foreground rounded-tl-none"
                    : "bg-primary text-primary-foreground rounded-tr-none"
                )}>
                  {msg.content}
                </div>

                {/* Feedback Pill (Only shown on bot messages, referring to user's previous answer) */}
                {msg.feedback && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-accent/30 border border-accent/50 rounded-xl p-3 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                       <span className="flex items-center gap-1 text-primary font-medium">
                         <Sparkles className="w-3 h-3" /> AI Analysis
                       </span>
                       <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-[10px] font-mono">
                         Score: {msg.feedback.score}/10
                       </span>
                    </div>
                    <p className="text-muted-foreground">{msg.feedback.text}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isSpeaking && (
           <div className="flex gap-1 ml-12">
             <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce delay-0"></span>
             <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce delay-150"></span>
             <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce delay-300"></span>
           </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/5 border-t border-white/10">
        <div className="flex gap-2">
          <Button 
             variant={isListening ? "destructive" : "secondary"}
             size="icon" 
             onClick={toggleMic}
             className="shrink-0 rounded-full w-10 h-10"
          >
            {isListening ? <StopCircle className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <form 
            className="flex-1 flex gap-2"
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          >
            <Input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your answer or use microphone..."
              className="bg-black/20 border-white/10 focus-visible:ring-primary/50"
              autoFocus
            />
            <Button type="submit" size="icon" disabled={!inputValue.trim()} className="rounded-full w-10 h-10 shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
        <div className="text-[10px] text-center mt-2 text-muted-foreground">
          {isListening ? "Listening... (Speak clearly)" : "Pro tip: Speak naturally and provide examples."}
        </div>
      </div>
    </div>
  );
}
