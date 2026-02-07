import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Award, Clock } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen pt-24 pb-12 container px-4 mx-auto max-w-6xl">
      <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl font-display font-bold mb-2">Performance Analytics</h1>
        <p className="text-muted-foreground">Track your progress and identify areas for improvement.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Avg. Score" 
          value="8.4" 
          change="+12%" 
          icon={<TrendingUp className="w-5 h-5 text-green-400" />} 
        />
        <StatsCard 
          title="Sessions" 
          value="14" 
          icon={<Clock className="w-5 h-5 text-blue-400" />} 
        />
        <StatsCard 
          title="Strongest Skill" 
          value="System Design" 
          icon={<Target className="w-5 h-5 text-purple-400" />} 
        />
        <StatsCard 
          title="Top Percentile" 
          value="Top 15%" 
          icon={<Award className="w-5 h-5 text-yellow-400" />} 
        />
      </div>

      {/* Main Charts */}
      <div className="mb-8">
        <DashboardCharts />
      </div>

      {/* Recent Activity List (Mock) */}
      <Card className="glass-panel border-white/10 bg-transparent">
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { role: "Software Developer", date: "Today", score: 8.5, status: "Excellent" },
              { role: "HR Round", date: "Yesterday", score: 7.2, status: "Good" },
              { role: "System Design", date: "3 days ago", score: 6.8, status: "Needs Work" },
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                <div>
                  <h4 className="font-medium text-white">{session.role}</h4>
                  <p className="text-sm text-muted-foreground">{session.date}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl">{session.score}</div>
                  <div className={`text-xs ${
                    session.status === 'Excellent' ? 'text-green-400' :
                    session.status === 'Good' ? 'text-blue-400' : 'text-yellow-400'
                  }`}>{session.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({ title, value, change, icon }: any) {
  return (
    <Card className="glass-panel border-white/10 bg-transparent">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold font-display">{value}</h3>
          {change && <span className="text-xs text-green-400 font-medium">{change}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
