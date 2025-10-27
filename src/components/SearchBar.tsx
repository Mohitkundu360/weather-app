import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <Card className="glass-card border-none shadow-2xl mb-8 w-full max-w-2xl mx-auto hover:shadow-3xl transition-all duration-300 relative overflow-hidden">
      {/* Decorative gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="text-lg h-14 bg-background/50 border-border/50 focus-visible:ring-primary focus-visible:ring-2 pl-12 pr-4 transition-all duration-300"
              disabled={isLoading}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          </div>
          <Button 
            type="submit" 
            size="lg"
            disabled={isLoading || !city.trim()}
            className="px-8 h-14 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Search className="mr-2" size={20} />
            Search
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SearchBar;
