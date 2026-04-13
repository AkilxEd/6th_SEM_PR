from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import random

# 🔥 Import your ML functions
from model import predict_aqi, get_time_factor

app = FastAPI()

# ✅ CORS (frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🌍 Cities with coordinates
cities = {
    "Gunupur": {"lat": 19.0804, "lon": 83.8088},
    "Bhubaneswar": {"lat": 20.2961, "lon": 85.8245},
    "Delhi": {"lat": 28.7041, "lon": 77.1025},
    "Bangalore": {"lat": 12.9716, "lon": 77.5946}
}

# ✅ Home API
@app.get("/")
def home():
    return {"message": "Real-Time Backend Running"}


# =====================================================
# 🌍 REAL-TIME ENVIRONMENT DATA (ALL CITIES)
# =====================================================
@app.get("/environment")
def get_all_cities():

    result = {}

    for city, coord in cities.items():

        try:
            # 🌫 AQI API (OpenAQ)
            aqi_url = f"https://api.openaq.org/v2/latest?coordinates={coord['lat']},{coord['lon']}&radius=10000"
            aqi_res = requests.get(aqi_url, timeout=5).json()

            measurements = aqi_res.get("results", [])
            aqi = 50  # fallback

            if measurements:
                for m in measurements[0]["measurements"]:
                    if m["parameter"] == "pm25":
                        aqi = m["value"]

            # 🌡 Weather API (Open-Meteo)
            weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={coord['lat']}&longitude={coord['lon']}&current_weather=true"
            weather_res = requests.get(weather_url, timeout=5).json()

            current = weather_res.get("current_weather", {})
            temp = current.get("temperature", 30)
            wind = current.get("windspeed", 10)

            result[city] = {
                "aqi": round(aqi),
                "temperature": temp,
                "pollution_index": wind
            }

        except Exception as e:
            print(f"Error in {city}:", e)

            result[city] = {
                "aqi": 50,
                "temperature": 30,
                "pollution_index": 40
            }

    return result


# =====================================================
# 🧠 ML PREDICTION (REAL + SIMULATION)
# =====================================================
@app.get("/predict/{city}")
def predict(city: str):

    city = city.capitalize()

    if city not in cities:
        return {"error": "City not found"}

    coord = cities[city]

    try:
        # 🌫 AQI API
        aqi_url = f"https://api.openaq.org/v2/latest?coordinates={coord['lat']},{coord['lon']}&radius=10000"
        aqi_res = requests.get(aqi_url, timeout=5).json()

        measurements = aqi_res.get("results", [])
        aqi = 50

        if measurements:
            for m in measurements[0]["measurements"]:
                if m["parameter"] == "pm25":
                    aqi = m["value"]

        # 🌡 Weather API
        weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={coord['lat']}&longitude={coord['lon']}&current_weather=true"
        weather_res = requests.get(weather_url, timeout=5).json()

        current = weather_res.get("current_weather", {})
        temp = current.get("temperature", 30)

        # 🧠 YOUR ML LOGIC 🔥
        humidity = random.uniform(50, 90)

        prediction = predict_aqi(aqi, temp, humidity)
        prediction += get_time_factor()

        return {
            "city": city,
            "current_aqi": round(aqi),
            "predicted_aqi": max(0, round(prediction))
        }

    except Exception as e:
        print("Prediction error:", e)
        return {"error": "API failed"}


# =====================================================
# 📊 REPORT DATA (FOR REPORTS PAGE)
# =====================================================
@app.get("/report-data/{city}")
def report_data(city: str):

    city = city.capitalize()

    if city not in cities:
        return {"error": "City not found"}

    from model import generate_live_data

    data = generate_live_data()

    aqi = data["aqi"]
    temp = data["temperature"]
    humidity = data["humidity"]

    # 🔥 SMART ANALYSIS (NOT RANDOM)
    temp_stability = "High" if 25 <= temp <= 35 else "Medium"
    pollution_trend = "Increasing" if aqi > 80 else "Decreasing"
    variance = "Low" if abs(aqi - 70) < 15 else "Moderate"
    decision_confidence = "Very High" if variance == "Low" else "High"

    return {
        "avg_aqi": aqi,
        "temp_stability": temp_stability,
        "pollution_trend": pollution_trend,
        "variance": variance,
        "decision_confidence": decision_confidence
    }