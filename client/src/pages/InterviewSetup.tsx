import React, { useState } from 'react';
import { useLocation } from "wouter";
import { ROLES } from "@/lib/mockData";
import { ResumeUpload } from "@/components/interview/ResumeUpload";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InterviewSetup() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [customTopic, setCustomTopic] = useState("");
  const [_, setLocation] = useLocation();

  const handleStart = () => {
    if (customTopic.trim()) {
      setLocation(`/session/custom?topic=${encodeURIComponent(customTopic)}`);
    } else if (selectedRole) {
      setLocation(`/session/${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 container px-4 mx-auto max-w-5xl">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl font-display font-bold mb-4">Setup Your Session</h1>
        <p className="text-muted-foreground text-lg">Choose a role, enter a custom topic, or upload your resume.</p>
      </div>

      <Tabs defaultValue="role" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-[600px] grid-cols-3 bg-secondary/50 p-1 rounded-full">
            <TabsTrigger value="role" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Choose Role</TabsTrigger>
            <TabsTrigger value="topic" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Custom Topic</TabsTrigger>
            <TabsTrigger value="resume" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Upload Resume</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="role" className="animate-in fade-in zoom-in-95 duration-300">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROLES.map((role) => (
              <Card 
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id);
                  setCustomTopic("");
                }}
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-2 bg-secondary/20",
                  selectedRole === role.id ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.2)]" : "border-transparent hover:border-white/10"
                )}
              >
                <div className="p-6 space-y-4">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                    selectedRole === role.id ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"
                  )}>
                    <role.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-1">{role.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">{role.description}</p>
                  </div>
                  <div className="flex justify-end pt-2">
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                      selectedRole === role.id ? "border-primary bg-primary text-white" : "border-white/20"
                    )}>
                      {selectedRole === role.id && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="topic" className="animate-in fade-in zoom-in-95 duration-300">
          <Card className="max-w-2xl mx-auto p-8 bg-secondary/20 border-white/10">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-xl font-display font-bold">What do you want to practice?</h3>
              </div>
              <p className="text-muted-foreground">Enter any specific topic, technology, or domain (e.g., "Docker & Kubernetes", "Financial Risk Management", "Python for Data Analysis").</p>
              <div className="space-y-2">
                <Input 
                  placeholder="e.g. Distributed Systems Architecture" 
                  value={customTopic}
                  onChange={(e) => {
                    setCustomTopic(e.target.value);
                    setSelectedRole(null);
                  }}
                  className="h-14 text-lg bg-black/20 border-white/10 focus-visible:ring-primary/50"
                />
                <p className="text-xs text-muted-foreground italic">AI will generate a custom interview based on this topic.</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="resume" className="animate-in fade-in zoom-in-95 duration-300">
          <Card className="max-w-2xl mx-auto p-8 bg-secondary/20 border-white/10">
            <ResumeUpload onUpload={() => setSelectedRole("software-dev")} /> 
          </Card>
        </TabsContent>
      </Tabs>

      <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-20">
        <Button 
          size="lg" 
          disabled={!selectedRole && !customTopic.trim()}
          onClick={handleStart}
          className="h-16 px-8 rounded-full shadow-2xl text-lg font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          Begin Interview <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
