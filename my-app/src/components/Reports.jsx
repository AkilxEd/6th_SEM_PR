import { useEffect, useState } from "react";
import "./Reports.css";

export default function Reports() {

  const [city, setCity] = useState("Bhubaneswar");
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchReport();

    const interval = setInterval(fetchReport, 5000);
    return () => clearInterval(interval);
  }, [city]);

  const fetchReport = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/report-data/${city}`);
      const data = await res.json();

      console.log("REPORT:", data);

      setReport(data);

    } catch (err) {
      console.error("Report fetch error:", err);
    }
  };

  return (
    <div className="reports-page">

      <h1>Environmental Reports</h1>
      <p className="subtitle">
        Urban Temporal Consistency · Analytical Summary
      </p>

      {/* ✅ CITY SELECT */}
      <div style={{ margin: "20px 0" }}>
        <label>Select City: </label>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option>Gunupur</option>
          <option>Bhubaneswar</option>
          <option>Delhi</option>
          <option>Bangalore</option>
        </select>
      </div>

      {/* ✅ REPORT DATA */}
      <div className="report-box">

        <ReportRow
          label="Average AQI"
          value={report ? `${report.avg_aqi} (${report.avg_aqi < 80 ? "Good" : "Moderate"})` : "—"}
        />

        <ReportRow
          label="Temperature Stability"
          value={report ? report.temp_stability : "—"}
        />

        <ReportRow
          label="Pollution Trend"
          value={report ? report.pollution_trend : "—"}
        />

        <ReportRow
          label="Temporal Variance"
          value={report ? report.variance : "—"}
        />

        <ReportRow
          label="Decision Confidence"
          value={report ? report.decision_confidence : "—"}
        />

      </div>

      {/* ✅ SYSTEM REMARKS (DYNAMIC) */}
      <div className="report-note">
        <h3>System Remarks</h3>
        <p>
          {report
            ? `The system detects ${report.pollution_trend.toLowerCase()} pollution trends with ${report.decision_confidence.toLowerCase()} confidence, ensuring stable and reliable urban environmental decisions.`
            : "Loading analysis..."}
        </p>
      </div>

    </div>
  );
}

/* ROW COMPONENT */
function ReportRow({ label, value }) {
  return (
    <div className="report-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}