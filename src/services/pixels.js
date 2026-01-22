const PEXELS_HEADERS = {
    Authorization: process.env.PEXELS_API_KEY,
};
export async function fetchVideos(query, page = 1) {
    const res = await fetch(`https://api.pexels.com/videos/search?query=${query}&page=${page}`, { headers: PEXELS_HEADERS });
    if (!res.ok) throw new Error("Pexels Videos API failed");
    const raw = await res.json();
    console.log(raw);
    const data = raw.videos.map((item) => ({
        _id: item.id,
        type:"video",
        thumb_description: item.user.name,
        thumbnail: item.image,
        video_url: item.video_files[0].link,
        video_pic:item.video_pictures
    }))
    return data;
}