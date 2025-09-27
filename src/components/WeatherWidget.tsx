import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, MapPin, Thermometer, Eye, Droplets } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  icon: string;
  humidity?: number;
  visibility?: number;
  feelsLike?: number;
  description?: string;
}

const API_KEY = '9a2bfc2f065bd630ec571eb7f9d0c07b';
const DEFAULT_CITY = 'Mumbai';

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 22,
    condition: 'Loading...',
    location: 'Loading location...',
    icon: 'loading'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get user's location first
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherByCoords(latitude, longitude);
          },
          async (error) => {
            console.log('Geolocation error:', error.message);
            // Fallback to default city if geolocation fails
            await fetchWeatherByCity(DEFAULT_CITY);
          },
          { 
            timeout: 10000,
            enableHighAccuracy: false,
            maximumAge: 300000 // 5 minutes
          }
        );
      } else {
        // Fallback to default city if geolocation is not supported
        await fetchWeatherByCity(DEFAULT_CITY);
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Unable to fetch weather data');
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      console.log('API URL:', url);
      
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        } else if (response.status === 429) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else {
          throw new Error(`Weather API error: ${response.status} - ${response.statusText}`);
        }
      }
      
      const data = await response.json();
      console.log('Weather data received:', data);
      updateWeatherState(data);
    } catch (err) {
      console.error('Coords weather fetch error:', err);
      // Fallback to default city
      await fetchWeatherByCity(DEFAULT_CITY);
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    try {
      console.log(`Fetching weather for city: ${city}`);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      console.log('API URL:', url);
      
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        } else if (response.status === 429) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else if (response.status === 404) {
          throw new Error(`City "${city}" not found.`);
        } else {
          throw new Error(`Weather API error: ${response.status} - ${response.statusText}`);
        }
      }
      
      const data = await response.json();
      console.log('Weather data received:', data);
      updateWeatherState(data);
    } catch (err) {
      console.error('City weather fetch error:', err);
      
      // If Mumbai fails, try a different city
      if (city === 'Mumbai') {
        try {
          await fetchWeatherByCity('London');
          return;
        } catch (fallbackErr) {
          console.error('Fallback city also failed:', fallbackErr);
        }
      }
      
      setError(err instanceof Error ? err.message : 'Unable to fetch weather data');
      setLoading(false);
    }
  };

  const updateWeatherState = (data: any) => {
    try {
      const weatherData: WeatherData = {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        location: `${data.name}, ${data.sys.country}`,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        visibility: data.visibility ? Math.round(data.visibility / 1000) : undefined,
        feelsLike: Math.round(data.main.feels_like),
        description: data.weather[0].description
      };
      
      console.log('Setting weather state:', weatherData);
      setWeather(weatherData);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error updating weather state:', err);
      setError('Error processing weather data');
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string, iconCode?: string) => {
    // Use OpenWeatherMap icon codes for more accurate icons
    if (iconCode) {
      if (iconCode.includes('01')) return <Sun className="text-amber-500" size={24} />;
      if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
        return <Cloud className="text-slate-500" size={24} />;
      if (iconCode.includes('09') || iconCode.includes('10') || iconCode.includes('11')) 
        return <CloudRain className="text-blue-500" size={24} />;
      if (iconCode.includes('13')) return <CloudSnow className="text-blue-300" size={24} />;
      if (iconCode.includes('50')) return <Wind className="text-slate-400" size={24} />;
    }

    // Fallback to condition-based icons
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun className="text-amber-500" size={24} />;
      case 'clouds':
      case 'cloudy':
      case 'overcast':
        return <Cloud className="text-slate-500" size={24} />;
      case 'rain':
      case 'drizzle':
      case 'thunderstorm':
        return <CloudRain className="text-blue-500" size={24} />;
      case 'snow':
        return <CloudSnow className="text-blue-300" size={24} />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <Wind className="text-slate-400" size={24} />;
      default:
        return <Thermometer className="text-slate-400" size={24} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
          <div>
            <div className="text-xl font-semibold text-slate-800">Loading...</div>
            <div className="text-sm text-slate-500">Fetching weather</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <Thermometer className="text-slate-400" size={24} />
          <div>
            <div className="text-xl font-semibold text-slate-800">--°C</div>
            <div className="text-sm text-slate-500">Weather unavailable</div>
          </div>
        </div>
        <button 
          onClick={fetchWeatherData}
          className="text-sm text-blue-600 hover:text-blue-700 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-3">
          {getWeatherIcon(weather.condition, weather.icon)}
        </div>
        <div>
          <div className="text-xl font-semibold text-slate-800">
            {weather.temperature}°C
          </div>
          <div className="text-sm text-slate-500 capitalize">
            {weather.description || weather.condition}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-1 text-sm text-slate-500">
        <MapPin size={14} />
        <span>{weather.location}</span>
      </div>

      {/* Additional weather info - shown on hover or larger screens */}
      <div className="hidden lg:flex items-center space-x-4 text-xs text-slate-500">
        {weather.feelsLike && (
          <div className="flex items-center space-x-1">
            <Thermometer size={12} />
            <span>Feels {weather.feelsLike}°C</span>
          </div>
        )}
        {weather.humidity && (
          <div className="flex items-center space-x-1">
            <Droplets size={12} />
            <span>{weather.humidity}%</span>
          </div>
        )}
        {weather.visibility && (
          <div className="flex items-center space-x-1">
            <Eye size={12} />
            <span>{weather.visibility}km</span>
          </div>
        )}
      </div>
    </div>
  );
}