import pandas as pd
import random
import time
import os

# Load dataset safely (VERY IMPORTANT)
file_path = os.path.join(os.path.dirname(__file__), "aqi.csv")
data = pd.read_csv(file_path)

# Clean dataset
data = data.dropna()

# Ensure correct column names (adjust if needed)
data.columns = ["pm25", "temperature", "humidity"]


# 🔥 ML-like prediction function
def predict_aqi(pm25, temperature, humidity):
    base = (pm25 * 0.6) + (temperature * 0.25) + (humidity * 0.15)
    noise = random.uniform(-5, 5)
    return round(base + noise)


# 🔥 Time-based factor (simulates real-world traffic/pollution)
def get_time_factor():
    hour = time.localtime().tm_hour

    if 6 <= hour <= 10:
        return 10   # morning rush
    elif 17 <= hour <= 21:
        return 15   # evening rush
    else:
        return -5   # cleaner hours


# 🔥 Generate realistic live data
def generate_live_data():
    row = data.sample(1).iloc[0]

    pm25 = row["pm25"] + random.uniform(-5, 5)
    temp = row["temperature"] + random.uniform(-2, 2)
    humidity = row["humidity"] + random.uniform(-5, 5)

    aqi = predict_aqi(pm25, temp, humidity)
    aqi += get_time_factor()

    return {
        "aqi": max(0, round(aqi)),
        "temperature": round(temp, 1),
        "humidity": round(humidity, 1)
    }