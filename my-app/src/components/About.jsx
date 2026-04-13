import "./About.css";

export default function About() {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-overlay">
          <h1>About UrbanEDS</h1>
          <p>
            Temporal Consistency Learning for Urban Environmental
            Decision Systems
          </p>
        </div>
      </section>

      {/* PROJECT OVERVIEW */}
     <section className="about-section gradient-one">
      <div className="content-box">
        <h2>Project Overview</h2>
      <p>
          UrbanEDS is an intelligent decision-support platform designed to
          assist urban planners and policymakers in making reliable,
          data-driven environmental decisions. The system leverages
          <strong> Temporal Consistency Learning</strong> to ensure stable
          predictions across time, overcoming the limitations of traditional
          short-term forecasting models.
     </p>
    </div>
    </section>

      {/* PROBLEM STATEMENT */}
    <section className="about-section gradient-two">
    <div className="content-box">
      <h2>Problem Statement</h2>
      <p>
          Urban environments generate massive volumes of environmental data
          such as air quality, traffic flow, temperature, and emissions.
          However, existing AI models often produce unstable predictions that
          vary significantly over time, reducing trust and decision accuracy.
     </p>
    </div>
   </section>

    {/* SOLUTION */}
    <section className="about-section gradient-three">
     <div className="content-box">
      <h2>Proposed Solution</h2>
     <p>
         Our system applies Temporal Consistency Learning techniques to
          capture long-term dependencies in environmental data. This approach
          ensures that predictions remain consistent across time intervals,
          enabling reliable urban environmental planning and proactive
          governance.
     </p>
      </div>
     </section>


      {/* KEY FEATURES */}
      <section className="about-features">
        <h2>Key Features</h2>

        <div className="features-grid">
          <div className="feature-box">
            <h3>Temporal Learning</h3>
            <p>
              Learns stable patterns across time-series environmental data.
            </p>
          </div>

          <div className="feature-box">
            <h3>Urban Intelligence</h3>
            <p>
              Integrates multi-source urban environmental datasets.
            </p>
          </div>

          <div className="feature-box">
            <h3>Predictive Analytics</h3>
            <p>
              Forecasts pollution, heat zones, and environmental risks.
            </p>
          </div>

          <div className="feature-box">
            <h3>Decision Support</h3>
            <p>
              Provides explainable insights for sustainable city planning.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="about-footer">
        © 2026 Urban Environmental Decision System · UrbanEDS
      </footer>

    </div>
  );
}
