import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  icon: string;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 22,
    condition: 'Sunny',
    location: 'Mumbai, India',
    icon: 'sunny'
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="text-amber-500" size={24} />;
      case 'cloudy':
      case 'overcast':
        return <Cloud className="text-slate-500" size={24} />;
      case 'rainy':
      case 'rain':
        return <CloudRain className="text-blue-500" size={24} />;
      case 'snowy':
      case 'snow':
        return <CloudSnow className="text-blue-300" size={24} />;
      default:
        return <Wind className="text-slate-400" size={24} />;
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-3">
          {getWeatherIcon(weather.condition)}
        </div>
        <div>
          <div className="text-xl font-semibold text-slate-800">
            {weather.temperature}°C
          </div>
          <div className="text-sm text-slate-500">
            {weather.condition}
          </div>
        </div>
      </div>
      <div className="text-sm text-slate-500">
        {weather.location}
      </div>
    </div>
  );
}