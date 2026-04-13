import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-text">
            <span className="badge">AI + Smart Cities</span>

            <h1>
              Temporal Consistency Learning <br />
              for Urban Environmental Decisions
            </h1>

            <p>
              A next-generation decision intelligence system that delivers
              stable, time-consistent environmental predictions for sustainable
              urban planning.
            </p>

            <div className="hero-buttons">
              <button
                className="btn-main"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>

              <button
                className="btn-secondary"
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2 className="section-title">Core Capabilities</h2>
        <br />

        <div className="feature-grid">
          <div className="feature-card card1">
            <h3>Urban Data Fusion</h3>
            <p>
              Integrates air quality, climate sensors, traffic and satellite
              data into a unified environmental intelligence layer.
            </p>
          </div>

          <div className="feature-card card2">
            <h3>Temporal Consistency Learning</h3>
            <p>
              Eliminates unstable predictions by learning long-term temporal
              patterns, improving trust and reliability.
            </p>
          </div>

          <div className="feature-card card3">
            <h3>Predictive Intelligence</h3>
            <p>
              Forecasts pollution, heat zones, and environmental risks
              before they escalate into urban crises.
            </p>
          </div>

          <div className="feature-card card4">
            <h3>Decision Support System</h3>
            <p>
              Empowers policymakers with explainable insights for
              sustainable urban governance.
            </p>
          </div>
        </div>
      </section>

      {/* HIGHLIGHT */}
      <section className="highlight">
        <div className="highlight-box">
          <h2>Designed for Smart & Sustainable Cities</h2>
          <p>
            This platform bridges artificial intelligence and environmental
            science to support long-term, data-driven urban decisions.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 Urban Environmental Decision System · Temporal Consistency Learning
      </footer>

    </div>
  );
}