<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('https://www.emakina.com/api/news/getnewsbytype/de-at/2');

		if (res.ok) {
			let posts = await res.json();

			posts = posts.map(p => {
				p.slug = `/blog/${p.postUrl.split('/').pop()}`;
				return p;
			});

			return {
				props: { posts }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	export let posts: PostCompact[];
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Blog</h1>

<div class="posts">
	{#each posts as post}
		<a href={post.slug}>
			<img src={post.imageUrl} alt={post.title}>
			<h2>{post.title}</h2>
			<time>{post.formatedTime}</time>
		</a>
	{/each}
</div>

<style>
	.posts {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
		grid-template-rows: auto;
		justify-content: center;
	}

	a {
		border: 1px solid rgba(140, 140, 140, .5);
		padding: .5rem;
	}
	a:hover, a:focus {
		text-decoration: none;
	}
	img {
		width: calc(100% + 1rem + 2px);
		margin: calc(-.5rem - 1px);
		margin-bottom: 1rem;
	}
</style>
