import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Initialize React Query Client
const queryClient = new QueryClient();

const App: React.FC = () => {
  // Example weather data (you can later connect this to real API)
  const weather = "clouds"; // 'clear', 'rain', 'snow', 'storm', etc.

  // Map weather condition → background class
  const getBackgroundClass = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return "gradient-sky";
      case "clouds":
        return "gradient-cloudy";
      case "rain":
      case "drizzle":
        return "gradient-rainy";
      case "snow":
        return "bg-[hsl(var(--weather-snow))]";
      case "storm":
        return "bg-[hsl(var(--weather-storm))]";
      default:
        return "gradient-sky";
    }
  };

  // Generate animated particles (for background animation)
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 4 + 2}px`,
    duration: `${Math.random() * 3 + 2}s`,
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Toast & Notifications */}
        <Toaster />
        <Sonner />

        {/* Background Layer */}
        <div
          className={`relative min-h-screen flex flex-col transition-colors duration-500 ${getBackgroundClass(
            weather
          )}`}
        >
          {/* Animated weather particles */}
          <div className="weather-particles absolute inset-0 overflow-hidden">
            {particles.map((p, i) => (
              <span
                key={i}
                className="particle"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  animationDuration: p.duration,
                }}
              ></span>
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
