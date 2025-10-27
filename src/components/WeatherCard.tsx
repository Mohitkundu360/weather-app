import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets, Gauge } from "lucide-react";

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

interface WeatherCardProps {
  data: WeatherData;
}

const getWeatherIcon = (main: string) => {
  const iconProps = { size: 80, className: "text-primary-foreground drop-shadow-lg" };
  
  switch (main.toLowerCase()) {
    case "clear":
      return <Sun {...iconProps} />;
    case "clouds":
      return <Cloud {...iconProps} />;
    case "rain":
    case "drizzle":
      return <CloudRain {...iconProps} />;
    case "snow":
      return <CloudSnow {...iconProps} />;
    default:
      return <Cloud {...iconProps} />;
  }
};

const WeatherCard = ({ data }: WeatherCardProps) => {
  const weatherMain = data.weather[0].main;
  const gradientClass = 
    weatherMain.toLowerCase() === "clear" ? "gradient-sky" :
    weatherMain.toLowerCase() === "rain" || weatherMain.toLowerCase() === "drizzle" ? "gradient-rainy" :
    "gradient-cloudy";

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Main Weather Display */}
      <Card className={`${gradientClass} border-none shadow-2xl overflow-hidden mb-6 relative`}>
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
        
        <div className="p-8 md:p-12 text-primary-foreground relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                {data.name}, {data.sys.country}
              </h2>
              <p className="text-xl md:text-2xl capitalize opacity-90 mb-6 drop-shadow-md">
                {data.weather[0].description}
              </p>
              <div className="text-7xl md:text-9xl font-bold tracking-tight drop-shadow-2xl relative inline-block">
                {Math.round(data.main.temp)}°C
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full animate-ping"></div>
              </div>
              <p className="text-lg md:text-xl opacity-80 mt-4 drop-shadow-md">
                Feels like {Math.round(data.main.feels_like)}°C
              </p>
            </div>
            <div className="flex items-center justify-center relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl"></div>
              <div className="relative z-10 animate-float">
                {getWeatherIcon(weatherMain)}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="glass-card border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110 transform">
              <Wind className="text-primary" size={28} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium">Wind Speed</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                {data.wind.speed} m/s
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-card border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110 transform">
              <Droplets className="text-primary" size={28} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium">Humidity</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                {data.main.humidity}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-card border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110 transform">
              <Gauge className="text-primary" size={28} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium">Pressure</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                {data.main.pressure} hPa
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WeatherCard;
