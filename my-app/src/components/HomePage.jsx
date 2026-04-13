import React from "react";
import "./HomePage.css";
import Navbar from "./Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <div className="home">
        <h1>Urban Environmental Decision System</h1>
        <p>
          A platform using <b>Temporal Consistency Learning</b> to support
          sustainable and stable urban environmental decisions.
        </p>
      </div>
    </>
  );
}
