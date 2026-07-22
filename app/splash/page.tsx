"use client";

const letters = "NARRATE".split("");

export default function Splash() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b0a08",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700..800&family=Inter:wght@400;500&display=swap');

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
        @keyframes letterIn {
          from { opacity: 0; transform: translateY(16px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes tagIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerSweep {
          0% { background-position: -150% 0; }
          100% { background-position: 250% 0; }
        }
        @keyframes fadeOutAll {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .splashGlow {
          position: absolute;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          filter: blur(70px);
          background: radial-gradient(circle, rgba(232,184,75,0.5), rgba(232,184,75,0) 70%);
          animation: pulseGlow 3.3s ease-in-out infinite;
        }
        .splashRoot {
          text-align: center;
          position: relative;
          z-index: 1;
          animation: fadeOutAll 0.35s ease-in 2.95s forwards;
        }
        .splashWordmark {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: 42px;
          letter-spacing: 0.03em;
          display: inline-block;
        }
        .letter {
          display: inline-block;
          opacity: 0;
          background: linear-gradient(90deg, #f2ead9 40%, #ffe9a8 50%, #f2ead9 60%);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation:
            letterIn 0.45s cubic-bezier(.2,.8,.3,1) forwards,
            shimmerSweep 1.1s ease-out forwards;
          animation-delay: var(--d), 0.9s;
        }
        .splashTag {
          font-family: 'Inter', sans-serif;
          font-size: 11.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(230,222,206,0.4);
          text-align: center;
          margin-top: 8px;
          opacity: 0;
          animation: tagIn 0.6s ease-out 0.75s forwards;
        }
      `}</style>

      <div className="splashGlow" />
      <div className="splashRoot">
        <div className="splashWordmark">
          {letters.map((l, i) => (
            <span key={i} className="letter" style={{ ["--d" as any]: `${0.1 + i * 0.06}s` }}>
              {l}
            </span>
          ))}
        </div>
        <div className="splashTag">prove it on-chain</div>
      </div>
    </div>
  );
}
