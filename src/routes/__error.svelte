<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				error,
                status,
			}
		};
	}
</script>

<script>
    import {dev} from '$app/env';
	export let error;
	export let status;
</script>

<h1>Something went wrong ({status})</h1>
<p>{error.message}</p>

{#if dev} 
<pre>
    {JSON.stringify(error, null, 2)}
</pre>
{/if}