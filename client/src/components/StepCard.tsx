import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: "orange" | "white" | "green";
  delay?: number;
}

export function StepCard({ number, title, description, icon: Icon, color, delay = 0 }: StepCardProps) {
  const colorStyles = {
    orange: "bg-orange-50 border-orange-100 text-orange-900 icon-bg-orange-100 icon-text-orange-600",
    white: "bg-white border-slate-100 text-slate-900 icon-bg-slate-100 icon-text-slate-600",
    green: "bg-green-50 border-green-100 text-green-900 icon-bg-green-100 icon-text-green-600",
  };

  const selectedStyle = colorStyles[color];

  return (
    <div 
      className={cn(
        "relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        selectedStyle,
        "animate-fade-in"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute -top-4 -right-4 text-6xl font-black opacity-5 select-none font-display">
        {number}
      </div>
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", color === 'orange' ? 'bg-orange-100 text-orange-600' : color === 'green' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-900')}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold mb-2 font-display">{title}</h3>
      <p className="text-sm opacity-80 leading-relaxed">{description}</p>
    </div>
  );
}
