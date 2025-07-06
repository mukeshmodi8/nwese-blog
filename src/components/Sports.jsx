import React, { useEffect, useState } from "react";
import "./Sports.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sports = () => {
  const [liveMatch, setLiveMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLiveMatch = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/cricket"
      );
      const data = await res.json();

      if (data.status === "failure") {
        throw new Error(data.reason || "API Error");
      }

      const live = data.data.find(
        (match) => match.matchStarted === true && match.matchEnded === false
      );

      setLiveMatch(live || null);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error(`❌ ${error.message}`);
      setLiveMatch(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMatch();

    const interval = setInterval(() => {
      console.log("🔁 Auto Refreshing Live Match...");
      fetchLiveMatch();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sports-container sports-page">
      <h2 className="section-title">🏏 स्पोर्ट्स न्यूज़</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>⏳ स्कोर लोड हो रहा है...</p>
      ) : liveMatch ? (
        <div className="live-match-card">
          <div className="top-row">
            <span className="match-name">{liveMatch.name}</span>
            <span className="live-dot">🔴 LIVE</span>
          </div>
          <p className="match-info">{liveMatch.status}</p>

          <div className="teams">
            {liveMatch.teams.map((team, index) => (
              <div key={index} className="team">
                <img
                  src={liveMatch.teamInfo?.[index]?.img}
                  alt={team}
                  width="50"
                  height="50"
                  style={{ borderRadius: "50%" }}
                />
                <p>{team}</p>
              </div>
            ))}
          </div>

          <div className="scores">
            {liveMatch.score?.map((inning, idx) => (
              <div key={idx} className="score-card">
                <strong>{inning.inning}</strong>
                <p>
                  {inning.r}/{inning.w} ({inning.o} ओवर)
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "gray" }}>
          ❌ कोई लाइव मैच नहीं चल रहा है।
        </p>
      )}
    </div>
  );
};

export default Sports;
