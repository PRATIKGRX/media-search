import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) return NextResponse.json({ suggestions: [] });

  try {
    const response = await axios.get(
      "https://serpapi.com/search.json",{
        params: {
        engine: "google_autocomplete",
        q,
        api_key: process.env.SERPAPI_API_KEY,
      },
      }
    );
    const suggestions=response.data?.suggestions.map((item)=>item.value).slice(0,6)
    return NextResponse.json({suggestions});
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
