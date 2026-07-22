import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;
  const now = Math.floor(Date.now() / 1000);
  const dayAgo = now - 60 * 60 * 24;

  try {
    const [overviewRes, historyRes] = await Promise.all([
      fetch(`https://public-api.birdeye.so/defi/token_overview?address=${address}`, {
        headers: {
          "X-API-KEY": process.env.BIRDEYE_API_KEY as string,
          "x-chain": "solana",
          accept: "application/json",
        },
        cache: "no-store",
      }),
      fetch(
        `https://public-api.birdeye.so/defi/history_price?address=${address}&address_type=token&type=15m&time_from=${dayAgo}&time_to=${now}`,
        {
          headers: {
            "X-API-KEY": process.env.BIRDEYE_API_KEY as string,
            "x-chain": "solana",
            accept: "application/json",
          },
          cache: "no-store",
        }
      ),
    ]);

    const overview = await overviewRes.json();
    const history = await historyRes.json();

    if (!overview.success) {
      console.log("BIRDEYE OVERVIEW ERROR:", overviewRes.status, overview);
      return NextResponse.json(
        { overview: null, history: [], error: overview, status: overviewRes.status },
        { status: 200 }
      );
    }

    return NextResponse.json({ overview: overview.data, history: history.data?.items || [] });
  } catch (err: any) {
    console.log("SERVER FETCH ERROR:", err.message);
    return NextResponse.json({ overview: null, history: [], error: err.message }, { status: 200 });
  }
}
