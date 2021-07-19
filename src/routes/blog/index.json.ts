import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const get: RequestHandler<Locals> = async () => {
	const res = await fetch('https://www.emakina.com/api/news/getnewsbytype/de-at/2');

    if (res.ok) {
        let posts = await res.json();

        posts = posts.map(p => {
            p.slug = `/blog/${p.postUrl.split('/').pop()}`;
            return p;
        });

        return {
            body: JSON.stringify({ posts })
        };
    }

    const { message } = await res.json();

    return {
        status: res.status,
        body: message
    };
}