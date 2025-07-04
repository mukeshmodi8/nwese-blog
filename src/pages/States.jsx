import React from "react";
import { Link } from "react-router-dom";
import "./States.css";

const states = [
  { name: "गुजरात", icon: "🧍‍♂️" },
  { name: "उत्तर प्रदेश", icon: "🕌" },
  { name: "बिहार", icon: "🧘" },
  { name: "दिल्ली-एनसीआर", icon: "🧱" },
  { name: "पंजाब", icon: "🏛️" },
  { name: "हरियाणा", icon: "🚜" },
  { name: "उत्तराखंड", icon: "🛕" },
  { name: "झारखंड", icon: "⛰️" },
  { name: "छत्तीसगढ़", icon: "🐯" },
  { name: "मध्य प्रदेश", icon: "🛐" },
  { name: "हिमाचल प्रदेश", icon: "🏔️" },
  { name: "जम्मू-कश्मीर", icon: "🚣" },
  { name: "पश्चिम बंगाल", icon: "🗡️" },
  { name: "ओडिशा", icon: "🛞" },
  { name: "महाराष्ट्र", icon: "🕌" },
  { name: "राजस्थान", icon: "🐪" },
];

const States = () => {
  return (
    <div className="states-container">
      <h2>राज्य चुनें</h2>
      <div className="state-grid">
        {states.map((state) => (
          <Link to={`/state/${state.name}`} key={state.name} className="state-card">
            <div className="state-icon">{state.icon}</div>
            <div className="state-name">{state.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default States;
