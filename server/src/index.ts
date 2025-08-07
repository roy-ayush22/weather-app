import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/api/weather", async (req, res) => {
  const API_KEY = process.env.WEATHER_KEY;
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const city = req.query.city as string;
  if (!city) {
    res.status(400).json({
      message: "city parameter is required",
    });
  }

  if (!API_KEY) {
    res.status(500).json({
      message: "api key invalid or missing",
    });
  }

  const response = await axios.get(
    `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );

  res.json({
    city: response.data.name,
    country: response.data.sys.country,
    temperature: response.data.main.temp,
    windSpeed: response.data.wind.speed,
    humidity: response.data.main.humidity,
  });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
