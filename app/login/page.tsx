"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Swords, TrendingUp, Trophy } from "lucide-react";

export default function Login() {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#0b0a08",
      position: "relative",
      overflow: "hidden",
      padding: 24,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700..800&family=Inter:wght@400;500;600&display=swap');
        .loginGlow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(70px);
          background: radial-gradient(circle, rgba(232,184,75,0.35), rgba(232,184,75,0) 70%);
        }
      `}</style>

      <div className="loginGlow" />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 340, width: "100%" }}>
        <div style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 800,
          fontSize: 36,
          color: "#f2ead9",
          marginBottom: 6,
        }}>
          NARRATE
        </div>
        <div style={{
          fontSize: 12,
          color: "rgba(230,222,206,0.45)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: 6,
        }}>
          prove it on-chain
        </div>

        <div style={{
          fontSize: 13,
          color: "rgba(230,222,206,0.6)",
          marginBottom: 22,
          lineHeight: 1.5,
        }}>
          Trade Solana tokens, duel other traders, and build a public track record.
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 22, marginBottom: 30 }}>
          <Feature label="Duel" Icon={Swords} />
          <Feature label="Trade" Icon={TrendingUp} />
          <Feature label="Rank" Icon={Trophy} />
        </div>

        <button
          onClick={login}
          disabled={!ready}
          style={{
            width: "100%",
            padding: "15px 0",
            borderRadius: 14,
            border: "none",
            background: "linear-gradient(155deg, #e8b84b, #a97a2c)",
            color: "#0b0a08",
            fontSize: 15,
            fontWeight: 700,
            cursor: ready ? "pointer" : "not-allowed",
            opacity: ready ? 1 : 0.6,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {ready ? "Connect Solana Wallet" : "Loading..."}
        </button>

        <div style={{ fontSize: 11, color: "rgba(230,222,206,0.35)", marginTop: 16 }}>
          No wallet? One will be created for you automatically.
        </div>
      </div>
    </div>
  );
}

function Feature({ label, Icon }: { label: string; Icon: any }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: "rgba(212,168,83,0.08)",
        border: "1px solid rgba(212,168,83,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={18} color="#e8b84b" strokeWidth={1.8} />
      </div>
      <span style={{ fontSize: 10.5, color: "rgba(230,222,206,0.5)" }}>{label}</span>
    </div>
  );
}
