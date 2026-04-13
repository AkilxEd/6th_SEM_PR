import "./Prediction.css";
import { useState, useEffect } from "react";

export default function Prediction() {

  const [city, setCity] = useState("Delhi");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrediction();
  }, [city]);

  const fetchPrediction = () => {
    setLoading(true);

    fetch(`http://127.0.0.1:8000/predict/${city}`)
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Prediction error:", err);
        setLoading(false);
      });
  };

  if (loading) {
    return <h2 style={{ color: "white" }}>Loading predictions...</h2>;
  }

  return (
    <div className="prediction-page">

      <h1>Environmental Predictions</h1>

      {/* CITY SELECT */}
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option>Gunupur</option>
        <option>Bhubaneswar</option>
        <option>Delhi</option>
        <option>Bangalore</option>
      </select>

      <div className="prediction-grid">

        <PredictionCard
          title="Current AQI"
          value={`${data?.current_aqi ?? "N/A"} AQI`}
        />

        <PredictionCard
          title="Predicted AQI"
          value={`${data?.predicted_aqi ?? "N/A"} AQI`}
        />

        <PredictionCard
          title="Pollution Risk"
          value={data?.predicted_aqi > 100 ? "High" : "Moderate"}
        />

        <PredictionCard
          title="Temporal Confidence"
          value="92%"
        />

      </div>

    </div>
  );
}

function PredictionCard({ title, value }) {
  return (
    <div className="prediction-card">
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}