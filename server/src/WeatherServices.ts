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
    return res.status(400).json({
      message: "city parameter is required",
    });
  }

  if (!API_KEY) {
    return res.status(500).json({
      message: "api key invalid or missing",
    });
  }

  try {
    const response = await axios.get(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    return res.json(response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || "Failed to fetch weather data",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
