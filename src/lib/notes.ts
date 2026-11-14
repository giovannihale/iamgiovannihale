import { getCollection } from "astro:content";

export async function getPublishedNotes() {
	const notes = await getCollection("notes", ({ data }) => !data.draft);
	return notes.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
