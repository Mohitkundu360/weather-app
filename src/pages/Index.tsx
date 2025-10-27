import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { Cloud } from "lucide-react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

interface WeatherData {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchWeather = async (city: string) => {
    if (API_KEY === "YOUR_API_KEY_HERE") {
      toast({
        title: "API Key Required",
        description: "Please add your OpenWeatherMap API key in src/pages/Index.tsx",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found. Please check the spelling and try again.");
        }
        throw new Error("Failed to fetch weather data. Please try again.");
      }

      const data = await response.json();
      setWeatherData(data);
      toast({
        title: "Success!",
        description: `Weather data loaded for ${data.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Cloud Graphics */}
        <Cloud className="absolute top-32 right-1/4 text-primary/5 animate-float" size={120} />
        <Cloud className="absolute bottom-40 left-1/3 text-secondary/5 animate-float-delayed" size={100} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full"></div>
            <Cloud className="text-primary relative z-10 drop-shadow-lg animate-float" size={48} />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent relative z-10">
              Weather App
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get real-time weather information for any city around the world
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={fetchWeather} isLoading={isLoading} />

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12 animate-fade-in">
            <div className="relative inline-block">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary"></div>
              <Cloud className="absolute inset-0 m-auto text-primary animate-pulse" size={32} />
            </div>
            <p className="mt-6 text-lg text-muted-foreground font-medium">Loading weather data...</p>
          </div>
        )}

        {/* Weather Display */}
        {!isLoading && weatherData && <WeatherCard data={weatherData} />}

        {/* Initial State */}
        {!isLoading && !weatherData && (
          <div className="text-center py-16 animate-fade-in">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl rounded-full"></div>
              <Cloud className="relative z-10 mx-auto text-muted-foreground/30 animate-float" size={80} />
            </div>
            <p className="text-xl text-muted-foreground font-medium">
              Enter a city name to get started
            </p>
            <p className="text-sm text-muted-foreground/60 mt-2">
              Discover weather conditions anywhere in the world
            </p>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="fixed bottom-6 left-0 right-0 text-center z-20">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-background/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-border/50">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span>Powered by OpenWeatherMap API</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
