import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { Scan, Smile, Eye, AlertTriangle } from 'lucide-react';

export function WebcamPreview() {
  const [isFaceDetected, setIsFaceDetected] = useState(true); // Mock state
  const [feedback, setFeedback] = useState<string | null>(null);

  // Mock analysis loop
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly simulate feedback
      const rand = Math.random();
      if (rand > 0.8) {
        setFeedback("Maintain eye contact");
      } else if (rand > 0.9) {
        setFeedback("Try to smile more naturally");
      } else {
        setFeedback(null);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black aspect-video group">
      <Webcam
        audio={false}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        mirrored={true}
      />
      
      {/* Face Tracking Overlay Sim */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scanning Line */}
        <div className="scanner-line"></div>
        
        {/* Face Box (Static position for mock) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/4 left-1/3 w-1/3 h-1/2 border border-primary/50 rounded-lg flex flex-col justify-between p-2"
        >
          <div className="flex justify-between w-full">
            <div className="w-2 h-2 border-t border-l border-primary"></div>
            <div className="w-2 h-2 border-t border-r border-primary"></div>
          </div>
          <div className="flex justify-between w-full">
            <div className="w-2 h-2 border-b border-l border-primary"></div>
            <div className="w-2 h-2 border-b border-r border-primary"></div>
          </div>

          {/* Metrics */}
          <div className="absolute -right-24 top-0 space-y-2">
            <div className="bg-black/60 backdrop-blur-md p-2 rounded text-[10px] text-green-400 border border-green-500/30 flex items-center gap-1">
               <Eye className="w-3 h-3" /> Eye Contact: 98%
            </div>
            <div className="bg-black/60 backdrop-blur-md p-2 rounded text-[10px] text-blue-400 border border-blue-500/30 flex items-center gap-1">
               <Smile className="w-3 h-3" /> Sentiment: Pos
            </div>
          </div>
        </motion.div>

        {/* Real-time Feedback Toast */}
        {feedback && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-500/20 backdrop-blur border border-red-500/50 text-red-200 px-3 py-1 rounded-full text-xs flex items-center gap-2"
          >
            <AlertTriangle className="w-3 h-3" />
            {feedback}
          </motion.div>
        )}
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
        <span className="text-[10px] text-white/70 uppercase tracking-widest">Live Analysis</span>
      </div>
    </div>
  );
}
