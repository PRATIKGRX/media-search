export async function fetchImages(query, page) {
    const res = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}`, {
        headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
        }
    });
    if (!res.ok) throw new Error("Unsplash API failed");
    const raw = await res.json();
    const data = raw.results.map((item) => (
        {
            _id: item.id,
            type: "photo",
            description: item.description,
            thumb_description: item.alt_description,
            thumbnail: item.urls.thumb,
            img_url: item.urls.regular,
            download: item.links.download,
        }
    ));
    return data;
}
