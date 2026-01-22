// app/api/download/route.js
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    const filename = searchParams.get("filename") || "image.jpg";

    if (!url) return new Response("Missing URL", { status: 400 });

    // Fetch the image server-side
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) return new Response("Failed to fetch image", { status: 500 });

    const blob = await response.arrayBuffer();

    return new Response(blob, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "image/jpeg",
      },
    });
  } catch (err) {
    return new Response("Server error", { status: 500 });
  }
}
