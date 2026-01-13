import { fetchImages } from "@/src/services/unsplash";
import { fetchVideos } from "@/src/services/pixels";
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");
        const type = searchParams.get("type");
        const page = Number(searchParams.get("page"));
        if (!query) {
            return Response.json(
                { error: "Query parameter is required" },
                { status: 400 }
            );
        }
        let results = [];
        if (type === 'photo') {
            const unsplashImgResult = await fetchImages(query, page);
            console.log("Unsplash Results:", unsplashImgResult);
            results.push(...unsplashImgResult)
        }
        if (type === 'video') {
            const pexelsVideoResult = await fetchVideos(query, page);
            console.log("Pexels Results:", pexelsVideoResult);
            results.push(...pexelsVideoResult)
        }
        return Response.json({
            query,
            type,
            page,
            count: results.length,
            results,
        });
    } catch (err) {
        console.error("Search API error:", err);
        return Response.json({ error: "Failed to fetch media" }, { status: 500 });
    }
}