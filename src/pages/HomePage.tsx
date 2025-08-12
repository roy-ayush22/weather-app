import { useState } from "react";
import { Search, MapPin, Thermometer, Droplets, Wind, Loader2 } from "lucide-react";

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number };
  wind: { speed: number };
  weather: Array<{ main: string; description: string }>;
}

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3000/api/weather?city=${cityName}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="mt-8 text-3xl text-white font-bold">
        <h1>🌤️ Weather App</h1>
      </div>

      {/* Search Section */}
      <div className="mt-8">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              type="text"
              placeholder="Search for a city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center gap-2 font-medium"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Search
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        {loading && (
          <div className="text-center text-white">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
            <p>Getting weather data...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-100 bg-red-500/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl mb-2">❌</div>
            <p>{error}</p>
          </div>
        )}

        {weatherData && (
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-6 max-w-md text-white border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <h2 className="text-2xl font-bold text-center">
                {weatherData.name}, {weatherData.sys.country}
              </h2>
            </div>
            
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-2">
                <Thermometer className="w-8 h-8 mr-2" />
                <div className="text-5xl font-bold">
                  {Math.round(weatherData.main.temp)}°C
                </div>
              </div>
              <div className="text-lg capitalize opacity-90">
                {weatherData.weather[0].description}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-white/10 rounded-lg p-3">
                <Droplets className="w-6 h-6 mx-auto mb-1" />
                <p className="text-sm opacity-75">Humidity</p>
                <p className="text-lg font-semibold">{weatherData.main.humidity}%</p>
              </div>
              <div className="text-center bg-white/10 rounded-lg p-3">
                <Wind className="w-6 h-6 mx-auto mb-1" />
                <p className="text-sm opacity-75">Wind Speed</p>
                <p className="text-lg font-semibold">{weatherData.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}

        {!weatherData && !loading && !error && (
          <div className="text-center text-white/80">
            <div className="text-4xl mb-4">🌤️</div>
            <p>Search for a city to see weather!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
