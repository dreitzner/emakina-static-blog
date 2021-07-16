<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
import Error from '../__error.svelte';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch, page }) => {
		const { params: {slug} } = page;
		let err;
		let res;
		
		try {
			res = await fetch(`https://blog.emakina.com/wp-json/wp/v2/posts?slug=${slug}`);
	
			if (res.ok) {
				let post = (await res.json())[0];
				
				if (!post) return {error: 'Couldn\'t find any post with that slug', status: 500};

				post.date = (new Date(post.date)).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
				// console.log(post.content.rendered);
				
				post.content.rendered = post.content.rendered.replace(/href="\//gi, 'href="https://www.emakina.com/');
	
				return {
					props: { post }
				};
			}
	
			err = await res.json();
		} catch (error) {
			err = error
		}

		return {
			status: res.status,
			error: err,
		};
	};
</script>

<script lang="ts">
	export let post: PostDetails;

	let headline;

	$: pageTitle = headline
		? headline.innerText
		: 'loading...';

	$: ({
		title,
		content,
		cpa_author,
		date,
	} = post || {} as PostDetails);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>


<article class="post">
	<time>{date}</time>
	<h1 bind:this={headline}>{@html title?.rendered}</h1>
	<header>{cpa_author}</header>
	
	{@html content?.rendered}

	<footer>
		<a href="/blog">back</a>
	</footer>
</article>

<style>
	.post {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	}
	h1 {
		text-align: left;
	}
</style>
