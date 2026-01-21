import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) return NextResponse.json({ suggestions: [] });

  try {
    const { data } = await axios.get(
      "https://api.openwebninja.com/v1/web/autocomplete",
      {
        params: { q },
        headers: {
          "X-API-Key": process.env.SEARCH_API_KEY,
          "Accept": "application/json"
        },
      }
    );
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
