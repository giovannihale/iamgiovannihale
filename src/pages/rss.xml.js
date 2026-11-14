import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getPublishedNotes } from "../lib/notes";

export async function GET(context) {
	const notes = await getPublishedNotes();
	return rss({
		title: `${SITE_TITLE} — Field Notes`,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: notes.map((note) => ({
			title: note.data.title,
			description: note.data.description,
			pubDate: note.data.pubDate,
			link: `/notes/${note.id}/`,
		})),
	});
}
