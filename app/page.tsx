"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Token = {
  address: string;
  symbol: string;
  name: string;
  price: number;
  marketcap: number;
  volume24hUSD: number;
  price24hChangePercent: number;
  logoURI: string;
};

function formatPrice(price: number | null | undefined) {
  if (price == null) return "0.00";
  if (price >= 1) return price.toFixed(2);
  return price.toFixed(10).replace(/0+$/, "").replace(/\.$/, ".0");
}

export default function Home() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tokens")
      .then((res) => res.json())
      .then((data) => {
        setTokens(data.data?.tokens || []);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="blob" style={{ width: 220, height: 220, top: -60, left: -40 }} />
      <div className="blob" style={{ width: 260, height: 260, bottom: 40, right: -80, animationDelay: "3s" }} />

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "22px 16px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div className="wordmark" style={{ fontSize: 22, letterSpacing: "0.02em" }}>NARRATE</div>
            <div style={{ fontSize: 10.5, color: "rgba(230,222,206,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>
              prove it on-chain
            </div>
          </div>
          <div className="glass" style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 100 }}>
            <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>4,820</span>
            <span style={{ fontSize: 9.5, color: "rgba(230,222,206,0.4)" }}>PTS</span>
          </div>
        </div>

        <div style={{ marginBottom: 10, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15 }}>
          Top Tokens
        </div>

        {loading && <div style={{ color: "rgba(230,222,206,0.5)", padding: "20px 0" }}>Loading tokens...</div>}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tokens.map((t) => {
            const up = (t.price24hChangePercent ?? 0) >= 0;
            return (
              <Link
                key={t.address}
                href={`/token/${t.address}`}
                className="glass rowhover"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(155deg, rgba(232,184,75,0.15), rgba(169,122,44,0.05))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(212,168,83,0.15)", overflow: "hidden",
                }}>
                  <img
                    src={t.logoURI}
                    alt={t.symbol}
                    width={34}
                    height={34}
                    style={{ borderRadius: "50%" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#f2ead9" }}>{t.symbol}</div>
                  <div style={{ fontSize: 11, color: "rgba(230,222,206,0.45)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {t.name}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: "#f2ead9" }}>
                    ${formatPrice(t.price)}
                  </div>
                  <div className="mono" style={{ fontSize: 11, color: up ? "#5fd996" : "#e8697a" }}>
                    {up ? "+" : ""}{(t.price24hChangePercent ?? 0).toFixed(2)}%
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
