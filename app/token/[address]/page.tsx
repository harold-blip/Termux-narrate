"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function formatPrice(price: number | null | undefined) {
  if (price == null) return "0.00";
  if (price >= 1) return price.toFixed(2);
  return price.toFixed(10).replace(/0+$/, "").replace(/\.$/, ".0");
}

function formatBig(n: number | null | undefined) {
  if (n == null) return "—";
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(2) + "K";
  return "$" + n.toFixed(2);
}

export default function TokenPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = use(params);
  const [overview, setOverview] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/token/${address}`)
      .then((res) => res.json())
      .then((data) => {
        setOverview(data.overview);
        setHistory(
          (data.history || []).map((h: any) => ({
            time: new Date(h.unixTime * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            price: h.value,
          }))
        );
        setLoading(false);
      });
  }, [address]);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="blob" style={{ width: 220, height: 220, top: -60, left: -40 }} />
      <div className="blob" style={{ width: 260, height: 260, bottom: 40, right: -80, animationDelay: "3s" }} />

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 16px 40px", position: "relative", zIndex: 1 }}>
        <Link href="/" style={{ color: "rgba(232,184,75,0.7)", fontSize: 13, textDecoration: "none" }}>
          ← back
        </Link>

        {loading && <div style={{ color: "rgba(230,222,206,0.5)", padding: "40px 0" }}>Loading...</div>}
        {!loading && !overview && (
          <div style={{ color: "#e8697a", padding: "40px 0" }}>Token not found.</div>
        )}

        {overview && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0 20px" }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(155deg, rgba(232,184,75,0.15), rgba(169,122,44,0.05))",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(212,168,83,0.15)", overflow: "hidden",
              }}>
                <img src={overview.logoURI} width={48} height={48} style={{ borderRadius: "50%" }} />
              </div>
              <div>
                <div className="wordmark" style={{ fontSize: 19 }}>{overview.symbol}</div>
                <div style={{ fontSize: 12, color: "rgba(230,222,206,0.45)" }}>{overview.name}</div>
              </div>
            </div>

            <div className="mono" style={{ fontSize: 30, fontWeight: 700, color: "#f2ead9" }}>
              ${formatPrice(overview.price)}
            </div>
            <div className="mono" style={{
              fontSize: 13, fontWeight: 600, marginBottom: 20,
              color: (overview.priceChange24hPercent ?? 0) >= 0 ? "#5fd996" : "#e8697a",
            }}>
              {(overview.priceChange24hPercent ?? 0) >= 0 ? "+" : ""}
              {(overview.priceChange24hPercent ?? 0).toFixed(2)}% (24h)
            </div>

            <div className="glass" style={{ padding: 16, marginBottom: 16 }}>
              {history.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={history}>
                    <defs>
                      <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e8b84b" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#e8b84b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <YAxis domain={["auto", "auto"]} hide />
                    <Tooltip
                      contentStyle={{ background: "#14120e", border: "1px solid rgba(212,168,83,0.3)", borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: "rgba(230,222,206,0.6)" }}
                      itemStyle={{ color: "#e8b84b" }}
                    />
                    <Area type="monotone" dataKey="price" stroke="#e8b84b" strokeWidth={2} fill="url(#gold)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ color: "rgba(230,222,206,0.4)", textAlign: "center", padding: 40, fontSize: 13 }}>
                  No chart data available for this token yet.
                </div>
              )}
            </div>

            <div className="glass" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <Row label="Market Cap" value={formatBig(overview.marketCap)} />
              <Row label="24h Volume" value={formatBig(overview.v24hUSD)} />
              <Row label="Liquidity" value={formatBig(overview.liquidity)} />
              <Row label="Holders" value={overview.holder?.toLocaleString() ?? "—"} />
            </div>

            <button
              style={{
                width: "100%", marginTop: 20, padding: "14px 0", borderRadius: 14, border: "none",
                background: "linear-gradient(155deg, #e8b84b, #a97a2c)", color: "#0b0a08",
                fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif",
              }}
            >
              Trade {overview.symbol}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
      <span style={{ color: "rgba(230,222,206,0.45)" }}>{label}</span>
      <span className="mono" style={{ color: "#f2ead9" }}>{value}</span>
    </div>
  );
}
